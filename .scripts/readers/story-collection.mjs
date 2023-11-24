import { quantifyPath as quantify, readYAML } from '../helpers/index.mjs';

import readSeries from './story-series.mjs';
import readSingle from './story-single.mjs';

const readCollection = async (path, collection) => {
    collection.content = [];



    for (const dir of collection.order) {
        let entryDir = quantify(path, `./${dir}/`),
            entryInfo;

        // console.log(path, entryDir);

        try {
            entryInfo = await readYAML(entryDir, './info.yml');
        } catch {
            throw new Error(`Failed to read info.yml for: ${entryDir}`);
        }

        let entry;
        if (entryInfo.type === 'collection') {
            entry = await readCollection(entryDir, entryInfo);

        } else if (entryInfo.type === 'series') {
            entry = await readSeries(entryDir, entryInfo);

        } else if (entryInfo.type === 'single') {
            entry = await readSingle(entryDir, entryInfo);

        } else {
            console.error(`Unknown entry type ${entryDir}: ${entryInfo.type}`);
            continue;
        }

        collection.content.push(entry);
    }

    return collection;
};

export default readCollection;