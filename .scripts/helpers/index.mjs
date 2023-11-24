import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { stat, readdir, readFile, writeFile } from 'fs/promises';

import YAML from 'yaml';

export const rootdir = resolve(dirname(fileURLToPath(import.meta.url)), '../../');

export const quantifyPath = (...paths) => {
    return resolve(rootdir, ...paths);
}

export const readYAML = async (...paths) => {
    const quantifiedPath = quantifyPath(...paths);
    const contents = await readFile(quantifiedPath, { encoding: 'utf8'});
    return await YAML.parse(contents);
};
/*
export const listFiles = async (...paths) => {
    const files = [];

    const dir = quantifyPath(...paths);

    const entities = await readdir(dir);

    for (const entity of entities) {
        const entityPath = quantifyPath(dir, `./${entity}`);

        const estat = await stat(entityPath);
        if (estat.isFile()) {
            files.push(entityPath);

        } else if (estat.isDirectory()) {
            files.push(...(await listFiles(entityPath)));
        }
    }
    return files;
}
*/