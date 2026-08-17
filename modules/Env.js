/**
 * The machine-local settings the build reads from .env.
 *
 * These used to sit in package.json, so every checkout carried whoever
 * committed last -- and changing them for yourself meant a permanently dirty
 * working tree you had to remember not to commit. They come from .env instead,
 * which is gitignored; .env.example lists the keys.
 */
import * as fs from "fs";
import * as path from "path";
import {fileURLToPath} from "url";

/** The repository root, so a script works whatever directory it was started from. */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Everything a build writes and nothing anybody edits: the rendered patch, the
 * generated .jaf, the staging directory alice-tools packs out of, the two
 * reports left behind for a person to read.
 *
 * One directory rather than a dozen names, so .gitignore is a line rather than
 * a list that has to be remembered each time a script starts writing something
 * new -- the last one to be added, a candidates report, spent a while sitting
 * in git status as an unknown file because nobody thought of it.
 */
export const BUILD = path.join(ROOT, "build");

/**
 * Before writing into it. Neither fs.writeFile nor alice-tools creates a
 * missing directory, and a fresh checkout has none -- build/ holds nothing but
 * build products, so it is not in the repository.
 */
export const ensureBuild = () => {
    fs.mkdirSync(BUILD, {recursive: true});
    return BUILD;
};

try {
    process.loadEnvFile(path.join(ROOT, ".env"));
} catch {
    // No .env is fine -- the values may just as well come from the real
    // environment, and a missing one is reported per key by required() below.
}

export const required = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not set. Copy .env.example to .env and fill in your own paths.`);
    }
    return value;
};
