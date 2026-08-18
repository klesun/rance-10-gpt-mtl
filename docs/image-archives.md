# The two image archives

Two of the four archives we patch hold pictures rather than text: `Rance10Flat.afa`, which is the
UI's own parts — the buttons and labels a layout is assembled from — and `Rance10CG2.afa`, which is
the game's CG. Neither has an `npm run` command, and this is why: `ar pack` does not patch an
archive in place, it rebuilds the whole thing out of every entry its manifest lists. Packing one
therefore needs the game's own copy of the thousands of files nobody translated, and half a
gigabyte of somebody else's assets is not something the repository can carry.

| File | What it is |
|---|---|
| `archives/Rance10Flat_v1_04/` | the translated flat parts — hand-written |
| `archives/Rance10CG2_v1_04/` | the translated CG — hand-written |
| `archives/Rance10CG2_manifest.txt` | all 4243 entries CG2 is packed from — committed |
| `CG2-raw/` | the game's own CG2, extracted — gitignored, half a gigabyte |

Use alice-tools **0.13.0** for both. 0.9.1 answers `Invalid manifest type` to an `#ALICEPACK`
manifest, so `ALICE_EXE_PACK` — which exists because `#BATCHPACK` needs the newer build — is the
right binary here too. The commands below spell it `alice`; use whatever `ALICE_EXE_PACK` in your
`.env` points at.

## Rance10Flat

The whole record of how this was done once:

- Copy-replace [archives/Rance10Flat_v1_04](../archives/Rance10Flat_v1_04) into the `flat` directory
  extracted from the game's `Rance10Flat.afa`.
- Run, from the game installation directory: `alice ar pack .\Rance10Flat_manifest.txt`

**That manifest is not in the repository**, and nothing in the history has it, so the command
cannot be run as written until somebody writes one and commits it beside the other two. The shape
it needs is the `#BATCHPACK` one that [archives/Rance10Pact_manifest.txt](../archives/Rance10Pact_manifest.txt)
uses — a destination and then `src_dir,src_fmt,dst_dir,dst_fmt` rows — rather than the flat entry
list CG2 uses: what is under `archives/Rance10Flat_v1_04` is exploded flat parts
(`シス／クエスト／選択肢／緑ボタン／通常.flat.x.talt.0.png`), not archive entries. `scripts/pack.js`
does the same job for `Rance10Pact.afa` and is the thing to copy.

## Rance10CG2

The source directory `ar pack` reads, `CG2-raw`, has to hold every one of the 4243 files the
manifest lists and not just the ones you changed. It is gitignored; you make it by extracting the
game's `Rance10CG2.afa`.

1. **Back up `Rance10CG2.afa` first.** `ar pack` creates and truncates its destination *before* it
   reads the first source file, so anything that goes wrong afterwards leaves you with a 0-byte
   archive and no game images at all.
2. Extract the original, from the repository root:

       alice ar extract --raw -o CG2-raw "%GAME_DIR%\Rance10CG2.afa"

   `--raw` matters: without it alice re-encodes every `.ajp` as a `.png`, and then no entry in the
   manifest matches what is on disk. Expect this to stop early — see below — and check that
   `CG2-raw` really ends up with 4243 files.
3. Copy [archives/Rance10CG2_v1_04](../archives/Rance10CG2_v1_04) over `CG2-raw`, then rename
   `イベ／地図／セキガハラ.ajp.png` to `イベ／地図／セキガハラ.png`. It is the one translated image whose
   name still carries the original extension; the manifest spells it without.
4. Copy `archives/Rance10CG2_manifest.txt` **into `CG2-raw`** and change its second line to your own
   game directory. That line is the destination, quoted C-style, so every backslash in it is
   doubled:

       "E:\\some\\path\\Rance10CG2.afa"

   It has to live inside `CG2-raw` because 0.13.0 prints
   `Unrecognized manifest option: '--src-dir=CG2-raw'` and resolves every source path relative to
   *the manifest's own directory*. Running it from elsewhere fails on the very first entry with
   `can't determine size of file` — and, per step 1, only after it has already blanked the
   destination.
5. Pack into a scratch directory rather than straight over the game's copy:

       alice ar pack CG2-raw\pack.manifest.txt

6. Verify the result before installing it, the same way the `.ain` build is verified against the
   built file:

       alice ar list built.afa

   You want 4243 entries, and a diff against the same listing of the original archive should show
   changes only in the images you translated, each one `.ajp` becoming `.png`. Then copy the built
   archive over the game's and start the game.

### The extraction stops on a file name Windows will not accept

`シス／数字／１６ドット用?.ajp` and its 18-dot twin have a **literal `?`** in the name — that is how
they ship, which you can confirm by inflating the archive's zlib-compressed `INFO` table and
reading the CP932 bytes: `∞` is stored as `81 87` where these two are stored as `3f`. Legal inside
an archive, illegal in a Windows path, so `fopen` fails with `Invalid argument` — and alice does not
skip the entry and carry on, it **abandons the rest of the archive**. In v1.04 the 16-dot one is
index 4197, so you lose it and the 45 entries after it, 46 in all.

Extract those by index, giving each one its name from the manifest so alice never has to convert
the stored one:

    alice ar extract --raw -i 4197 -o "CG2-raw/シス／数字／１６ドット用〜.ajp" "%GAME_DIR%\Rance10CG2.afa"

Archive index *N* is manifest line *N+3*. The manifest writes `〜` (U+301C) where the archive has
`?`, which is what makes the file writable; packing converts it back to `3f`, so the rebuilt archive
matches the original byte for byte at those names. Do not "fix" the manifest to say `?` — you would
only get a file you cannot create.
