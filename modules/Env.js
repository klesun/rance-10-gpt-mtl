/**
 * The machine-local settings the build reads from .env.
 *
 * These used to sit in package.json, so every checkout carried whoever
 * committed last -- and changing them for yourself meant a permanently dirty
 * working tree you had to remember not to commit. They come from .env instead,
 * which is gitignored; .env.example lists the keys.
 */
import * as path from "path";
import {fileURLToPath} from "url";

/** The repository root, so a script works whatever directory it was started from. */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
