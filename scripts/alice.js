/**
 * Run alice-tools with the paths from .env, so package.json does not have to
 * name them. {game} in any argument expands to GAME_DIR.
 *
 *   node scripts/alice.js ex build -o {game}/Rance10EX.ex Rance10EX_v1_04/main.x
 */
import {alice, run} from "../modules/AliceTools.js";

run(() => alice(process.argv.slice(2)));
