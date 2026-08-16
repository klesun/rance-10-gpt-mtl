/**
 * Running alice-tools with the paths from .env.
 */
import {spawnSync} from "child_process";
import {required} from "./Env.js";

/** The game directory the build writes into. */
export const gameDir = () => required("GAME_DIR");

/**
 * Run alice-tools, expanding {game} in every argument.
 *
 * Spawned without a shell on purpose. These paths contain spaces, so they have
 * to be quoted, and cmd.exe strips the quotes off a command line that *begins*
 * with one -- which is how "E:\Modding games\..." ends up being run as
 * "E:\Modding". Passing an argv array sidesteps the question entirely.
 */
export const alice = (args, exe = required("ALICE_EXE")) => {
    const expanded = args.map(arg => arg.replaceAll("{game}", gameDir()));
    const result = spawnSync(exe, expanded, {stdio: "inherit"});
    if (result.error?.code === "ENOENT") {
        throw new Error(`alice-tools is not at ${exe} -- check ALICE_EXE in .env`);
    }
    if (result.error) {
        throw result.error;
    }
    return result.status ?? 1;
};

/**
 * Run an entry point, reporting a misconfigured .env as a plain message. A
 * missing path is the reader's problem to fix, not a stack trace to read.
 *
 * Awaited, so that an entry point which reads files can be async and still get
 * the same treatment -- an unawaited body would assign a promise to exitCode
 * and let its rejection past the catch as an unhandled one.
 */
export const run = async (body) => {
    try {
        process.exitCode = await body();
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
};
