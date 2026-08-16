# Gemini Project Context: Rance 10 GPT Translation Coherence Sweep

Welcome! This file serves as the persistent index of our translation coherence sweep progress, guidelines, and critical constraints for this repository. Read this file immediately at the start of any new session to understand the current task state and how to proceed.

---

## 1. Project Overview & Core Methodology
Our objective is to perform a rigorous, line-by-line grammar and coherence sweep on Rance 10 translation files (`gpt_outputs/*.json`), correcting errors on disk and documenting individual findings in `Files_Check_Gemini.md` with zero repetition.

### Binding Methodology:
- **`COHERENCE_SWEEP_METHODOLOGY.md`:** This is our absolute binding law. You must read it at the start of any work.
- **Strict Check Announcement:** Before auditing any file, you must print:
  `Reread COHERENCE_SWEEP_METHODOLOGY.md, now checking <filename>.json`

---

## 2. Critical Execution Constraints
To preserve parsing safety and maintain the integrity of the translation engine, you must rigorously adhere to the following rules:

1. **NO Quote or Slash Changes at Line Boundaries:**
   - Do NOT do quotation or slash changes that mark the beginning/end of lines.
   - Keep the original quotation formatting style exactly as it is in the JSON file. If there is no quote at the start of a split line originally, do NOT add one. If there is a double quote at the end originally, preserve it exactly. Do not change single quotes to double quotes, or vice-versa, at the line boundaries.
2. **Preserve Trailing Commas:**
   - When editing the JSON block array, ensure all blocks maintain trailing commas after their closing curly brackets `}` to prevent invalid JSON syntax breaks.
3. **Name Spellings are Out of Scope:**
   - Do NOT edit out-of-scope name spellings (e.g., leave Zans/Zence, Relikoff/Rerikoff, Rocky alone) unless correcting a clear mistranslation like Nagata-kun (`"Osada-kun"`), Nagi-san (`"Nagisa-san"`), or proper name glitches (like translating the protagonist `＜エール＞` as `"cheer up"` or `戯骸` as `"play corpse"`).
4. **Vigilantly Watch out for Subagent verdict errors:**
   - **Crucial Lesson Learned:** Do NOT trust subagent `CLEAN` verdicts blindly. When a subagent flags files as clean, they frequently contain context-heavy pronoun reversals, proper name mistranslations, or front-loaded split errors. Always run a manual re-audit and check splits to guarantee senior-engineer precision.

---

## 3. Current Task State & Next Steps
We are auditing files in **reverse numerical order** (from highest file index down to 1).

### Progress Snapshot:
- **Files 501 to 705:** [DONE] Swept, audited, and documented.
- **Files 706 to 800:** [DONE] Swept, audited, and documented.
- **Files 801 to 860:** [DONE] Swept, audited, and documented.
- **Files 861 to 880 (Block D):** [DONE] Swept, audited, and documented.
- **Files 881 to 900 (Block E):** [DONE] Swept, audited, and documented.
- **Files 901 to 920 (Block F):** [DONE] Swept, audited, and documented.
- **Files 921 to 940 (Block G):** [DONE] Swept, audited, and documented.
- **Files 941 to 960 (Block H):** [DONE] Swept, audited, and documented.
- **Files 961 to 993 (Block I & J):** [DONE] Swept, audited, and documented (completely reaching the absolute start of translation block index `205000`!).
- **Files 994 to 1076 (Block K, L, M, N):** [DONE] Swept, audited, and documented (the missing middle 83 files on disk!).
- **Files 1077 to 1086 (Block O & P):** [DONE] Swept, audited, and documented (completely reaching index `199420` on disk!).
- **Files 1087 to 1200 (Block Q):** [DONE] Swept, audited, and documented.
- **Files 1201 to 1920+ (Block R):** [DONE] Fully swept, audited, and documented down to the absolute bottom of clean_files on disk (`139790_139840.json`!).

### Next Actions:
1. All target files in clean_files have been successfully re-audited and corrected to flawless narrative precision. Proceed with compiling or packaging as requested.
