import { stat, readdir, readFile } from 'fs/promises';

import digestMarkdown from '../helpers/digest-markdown.mjs';
import { quantifyPath as quantify, readYAML } from '../helpers/index.mjs';
import readSingle from './story-single.mjs';

export default async (path, seriesInfo) => {
    seriesInfo.creators = new Set();
    seriesInfo.content = [];

    // loop over each chapter directory in the series
    const entities = await readdir(path);
    for (const entity of entities) {
        const epath = quantify(path, `./${entity}`);
        const estat = await stat(epath);
        if (!estat.isDirectory()) {
            continue;
        }

        let chapter;
        try {
            chapter = await readYAML(epath, './info.yml');
            chapter = await readSingle(epath, chapter);
        } catch {
            throw new Error(`Failed to read chapter: ${epath}`);
        }
        chapter.creator.forEach(creator => seriesInfo.creators.add(creator));
        seriesInfo.content.push(chapter)
    }

    seriesInfo.content.sort((a, b) => {
        if (a.index > b.index) {
            return 1;
        }
        if (a.index < b.index) {
            return -1;
        }
        return 0;
    });

    seriesInfo.creators = Array.from(seriesInfo.creators);
    return seriesInfo;
};