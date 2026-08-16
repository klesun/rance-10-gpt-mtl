/**
 * Where alice-tools and the game live on *this* machine.
 *
 * These paths used to sit in package.json, so every checkout carried whoever
 * committed last -- and changing them for yourself meant a permanently dirty
 * working tree you had to remember not to commit. They come from .env instead,
 * which is gitignored; .env.example lists the keys.
 */
import {spawnSync} from "child_process";
import * as path from "path";
import {fileURLToPath} from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

try {
    process.loadEnvFile(path.join(ROOT, ".env"));
} catch {
    // No .env is fine -- the values may just as well come from the real
    // environment, and a missing one is reported per key below anyway.
}

const required = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not set. Copy .env.example to .env and fill in your own paths.`);
    }
    return value;
};

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
 */
export const run = (body) => {
    try {
        process.exitCode = body();
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
};
