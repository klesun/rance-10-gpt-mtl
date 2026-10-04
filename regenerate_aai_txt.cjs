'use strict';
// Rebuild text by matching the original Japanese, rather than assuming
// that message numbers stayed the same between game versions.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

function readText(file) {
  const bytes = fs.readFileSync(file);
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return bytes.subarray(2).toString('utf16le');
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { return new TextDecoder('shift_jis', { fatal: true }).decode(bytes); }
}

function decodeLiteral(literal) {
  try { return JSON.parse(literal); } catch {}
  const escapes = { n: '\n', r: '\r', t: '\t', a: '\x07', b: '\b', f: '\f', v: '\v', '0': '\0', '"': '"', "'": "'", '\\': '\\' };
  return literal.slice(1, -1).replace(/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|.)/g, match => {
    const e = match.slice(1);
    if ((e[0] === 'x' && e.length === 3) || (e[0] === 'u' && e.length === 5)) return String.fromCharCode(parseInt(e.slice(1), 16));
    if (Object.hasOwn(escapes, e)) return escapes[e];
    throw new Error('Nieznana sekwencja w tekscie AIN: ' + match);
  });
}

function parseAssignments(text, includeCommented = false) {
  const entries = new Map();
  const pattern = includeCommented
    ? /^\s*;?\s*([ms])\[(\d+)\]\s*=\s*("(?:\\.|[^"\\])*")/
    : /^\s*([ms])\[(\d+)\]\s*=\s*("(?:\\.|[^"\\])*")/;
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(pattern);
    if (!m) continue;
    entries.set(m[1] + ':' + Number(m[2]), { kind: m[1], id: Number(m[2]), text: decodeLiteral(m[3]) });
  }
  return entries;
}

function normalizeJapanese(text) {
  return text.normalize('NFC').replace(/\r\n?/g, '\n').replace(/\n/g, '').trim();
}

function englishComparable(text) { return text.replace(/\s+/g, ' ').trim(); }

// The game's legacy Japanese encoding cannot store em/en dashes,
// nonbreaking spaces or accented Latin letters introduced by editing.
// Keep the Japanese and the source JSONs intact; adapt English on export.
function sanitizeEnglish(text) {
  return text.replace(/\u2014/g, '--').replace(/\u2013/g, '-')
    .replace(/[\u00a0\u2000-\u200a\u202f\u205f]/g, ' ')
    .replace(/[\u00c0-\u024f]/g, letter => letter.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
}

function wrapEnglish(text, width = 60) {
  return text.replace(/\r\n?/g, '\n').split('\n').map(paragraph => {
    if (paragraph.length <= width) return paragraph;
    const indent = paragraph.match(/^\s*/)[0];
    const words = paragraph.trimStart().split(/ +/);
    const lines = []; let current = indent;
    for (const word of words) {
      if (current.trim() && current.length + 1 + word.length > width) {
        lines.push(current); current = word;
      } else current += (current.trim() ? ' ' : '') + word;
    }
    lines.push(current); return lines.join('\n');
  }).join('\n');
}

function jsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const result = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...jsonFiles(full));
    else if (item.isFile() && /\.json$/i.test(item.name)) result.push(full);
  }
  return result.sort();
}

function loadRows(files, label) {
  const rows = new Map(); let count = 0, conflicts = 0;
  for (const file of files) {
    const obj = JSON.parse(readText(file).replace(/^\uFEFF/, ''));
    const lines = obj.output_parsed?.translationLines ?? obj.translationLines ?? (Array.isArray(obj) ? obj : null);
    if (!Array.isArray(lines)) throw new Error('Brak translationLines w pliku: ' + file);
    for (const r of lines) {
      const n = Number(r.lineNumber);
      if (!Number.isSafeInteger(n) || n < 0 || typeof r.originalJapaneseLine !== 'string' || typeof r.translatedEnglishLine !== 'string') {
        throw new Error('Nieprawidlowy rekord w pliku: ' + file);
      }
      count++;
      const ja = normalizeJapanese(r.originalJapaneseLine);
      if (!ja || !r.translatedEnglishLine.trim()) continue;
      const row = { n, ja, en: r.translatedEnglishLine, file: path.basename(file), label };
      const key = n + '\0' + ja;
      if (rows.has(key) && rows.get(key).en !== row.en) conflicts++;
      // Deterministic: later alphabetically sorted file wins on overlaps.
      rows.set(key, row);
    }
  }
  return { rows: [...rows.values()].sort((a, b) => a.n - b.n || a.ja.localeCompare(b.ja)), count, conflicts };
}

function buildJapaneseIndex(original) {
  const index = new Map();
  for (const item of original.values()) {
    if (item.kind !== 'm') continue;
    const ja = normalizeJapanese(item.text);
    if (!ja) continue;
    if (!index.has(ja)) index.set(ja, []);
    index.get(ja).push(item.id);
  }
  for (const ids of index.values()) ids.sort((a, b) => a - b);
  return index;
}

function findAnchors(rows, index) {
  const possible = new Map();
  for (const r of rows) {
    const ids = index.get(r.ja);
    if (r.ja.length >= 12 && ids?.length === 1 && Math.abs(ids[0] - r.n) < 5000) {
      if (!possible.has(r.n)) possible.set(r.n, new Set());
      possible.get(r.n).add(ids[0]);
    }
  }
  return [...possible].filter(([, ids]) => ids.size === 1)
    .map(([n, ids]) => ({ n, id: [...ids][0] })).sort((a, b) => a.n - b.n);
}

function neighbors(anchors, n) {
  let lo = 0, hi = anchors.length;
  while (lo < hi) { const mid = (lo + hi) >>> 1; if (anchors[mid].n < n) lo = mid + 1; else hi = mid; }
  return { left: anchors[lo - 1], right: anchors[lo] };
}

function mapRow(row, index, anchors, directIds) {
  const ids = index.get(row.ja);
  if (!ids?.length) return { reason: 'Japanese text not found in original AIN' };
  if (ids.length === 1) return { id: ids[0], method: 'unique Japanese text' };
  if (directIds && ids.includes(row.n)) return { id: row.n, method: 'v104 message ID and Japanese text' };
  const { left, right } = neighbors(anchors, row.n);
  const offsets = [];
  if (left && row.n - left.n <= 2000) offsets.push(left.id - left.n);
  if (right && right.n - row.n <= 2000) offsets.push(right.id - right.n);
  const predicted = [...new Set(offsets.map(d => row.n + d))].filter(id => ids.includes(id));
  if (predicted.length === 1) return { id: predicted[0], method: 'Japanese text and neighboring anchor' };
  if (left && right && left.id < right.id && right.n - left.n <= 2000) {
    const bounded = ids.filter(id => id > left.id && id < right.id);
    if (bounded.length === 1) return { id: bounded[0], method: 'Japanese text between neighboring anchors' };
  }
  return { reason: 'Ambiguous repeated Japanese text', candidates: ids };
}

function regenerate(original, baseline, groups) {
  const result = new Map(baseline);
  const index = buildJapaneseIndex(original);
  const missing = [], assigned = new Map();
  let mapped = 0, changed = 0, added = 0, targetConflicts = 0, encodingAdjustedRecords = 0;
  const groupStats = [];
  for (const group of groups) {
    const anchors = findAnchors(group.rows, index);
    let groupMapped = 0, groupUnmatched = 0;
    for (const row of group.rows) {
      const match = mapRow(row, index, anchors, group.directIds);
      if (match.id === undefined) { missing.push({ ...row, en: undefined, ...match }); groupUnmatched++; continue; }
      const key = 'm:' + match.id;
      const old = result.get(key);
      const safeEnglish = sanitizeEnglish(row.en);
      if (safeEnglish !== row.en) encodingAdjustedRecords++;
      const text = old && englishComparable(old.text) === englishComparable(safeEnglish) ? old.text : wrapEnglish(safeEnglish);
      if (assigned.has(key) && assigned.get(key).text !== text) targetConflicts++;
      assigned.set(key, { text, source: row.file, lineNumber: row.n, label: row.label });
      if (!old) added++;
      else if (old.text !== text) changed++;
      result.set(key, { kind: 'm', id: match.id, text });
      mapped++; groupMapped++;
    }
    groupStats.push({ label: group.label, records: group.count, selected: group.rows.length, overlapConflicts: group.conflicts, anchors: anchors.length, mapped: groupMapped, unmatched: groupUnmatched });
  }
  return { result, missing, summary: { mapped, changed, added, targetConflicts, encodingAdjustedRecords, groups: groupStats } };
}

function serialize(entries) {
  return [...entries.values()].sort((a, b) => a.kind.localeCompare(b.kind) || a.id - b.id)
    .map(e => `${e.kind}[${e.id}] = ${JSON.stringify(e.text)}`).join('\r\n') + '\r\n';
}

function main() {
  const root = __dirname;
  const originalAIN = path.join(root, 'Rance10.v1.04.ain');
  const alice = path.join(root, process.platform === 'win32' ? 'alice.exe' : 'alice');
  const baselineFile = path.join(root, 'regenerated.ain.txt');
  const output = path.join(root, 'regenerated.poprawione.ain.txt');
  const dump = path.join(root, 'original.v104.dump.txt');
  const mainFiles = jsonFiles(path.join(root, 'gpt_outputs'));
  if (!mainFiles.length) throw new Error('Brak JSON-ow w folderze gpt_outputs obok skryptu.');
  if (!fs.existsSync(originalAIN)) throw new Error('Brak oryginalnego Rance10.v1.04.ain obok skryptu.');
  if (!fs.existsSync(alice)) throw new Error('Brak alice.exe obok skryptu.');
  if (!fs.existsSync(baselineFile)) throw new Error('Brak regenerated.ain.txt obok skryptu.');
  console.log('Odczytuje tekst z oryginalnego AIN...');
  execFileSync(alice, ['ain', 'dump', '-t', '-o', dump, originalAIN], { cwd: root, stdio: 'inherit', windowsHide: true });
  const original = parseAssignments(readText(dump), true);
  if ([...original.values()].filter(e => e.kind === 'm' && /[\u3040-\u30ff\u3400-\u9fff]/.test(e.text)).length < 100) {
    throw new Error('Oryginalny AIN nie zawiera oczekiwanego japonskiego tekstu. Potrzebny jest oryginal gry 1.04.');
  }
  const baseline = parseAssignments(readText(baselineFile));
  if (!baseline.size) throw new Error('regenerated.ain.txt nie zawiera wpisow m[]/s[].');
  const invalid = [...baseline].filter(([key]) => !original.has(key));
  if (invalid.length) throw new Error('Numery ze starego TXT nie pasuja do AIN 1.04 (np. ' + invalid[0][0] + '). Przerwano bez zapisu.');
  console.log('Wczytuje ' + mainFiles.length + ' plikow JSON...');
  const groups = [{ ...loadRows(mainFiles, 'gpt_outputs'), label: 'gpt_outputs', directIds: false }];
  const extraFiles = jsonFiles(path.join(root, 'gpt_outputs_v104'));
  if (extraFiles.length) groups.push({ ...loadRows(extraFiles, 'gpt_outputs_v104'), label: 'gpt_outputs_v104', directIds: true });
  const built = regenerate(original, baseline, groups);
  if (!built.summary.mapped) throw new Error('Nie dopasowano zadnego tlumaczenia. Przerwano bez zapisu.');
  const serialized = serialize(built.result);
  const reparsed = parseAssignments(serialized);
  if (reparsed.size !== built.result.size) throw new Error('Kontrola wyniku nie powiodla sie.');
  for (const [key, entry] of built.result) {
    if (reparsed.get(key)?.text !== entry.text) throw new Error('Kontrola tekstu nie powiodla sie: ' + key);
  }
  const temporary = output + '.tmp';
  fs.writeFileSync(temporary, serialized, 'utf8');
  fs.renameSync(temporary, output);
  fs.writeFileSync(path.join(root, 'regeneration_report.json'), JSON.stringify({ output: path.basename(output), baselineEntries: baseline.size, outputEntries: built.result.size, ...built.summary, unmatched: built.missing }, null, 2), 'utf8');
  console.log('Gotowe: ' + path.basename(output));
  console.log('Dopasowane rekordy: ' + built.summary.mapped + '; dodane wpisy: ' + built.summary.added + '; zmiany: ' + built.summary.changed);
  console.log('Niedopasowane rekordy: ' + built.missing.length + '. Szczegoly: regeneration_report.json');
  console.log('Wpisy z dostosowanymi znakami do kodowania gry: ' + built.summary.encodingAdjustedRecords);
  console.log('Dotychczasowy regenerated.ain.txt zachowano.');
}

if (require.main === module) {
  try { main(); } catch (error) { console.error('\nBLAD: ' + error.message); process.exitCode = 1; }
}
module.exports = { parseAssignments, normalizeJapanese, loadRows, buildJapaneseIndex, findAnchors, mapRow, regenerate, serialize, wrapEnglish, sanitizeEnglish };
