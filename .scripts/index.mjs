import { writeFile, mkdir } from 'fs/promises';

import {
    quantifyPath as quantify,
    readYAML,
    rootdir
} from './helpers/index.mjs';

import { readCollection } from './readers/index.mjs';

// generate stories json
const groupinfo = await readYAML('./stories/info.yml');
const stories = await readCollection(quantify(rootdir, './stories/'), groupinfo);

// todo: Generate creators json
// todo: Generate media json


// write files
await mkdir(quantify('./data'));
await writeFile(quantify('./data/stories.json'), JSON.stringify(stories), { encoding: 'utf8' });
// await writeFile(quantify('./data/creators.json'), JSON.stringify(stories), { encoding: 'utf8' });
// await writeFile(quantify('./data/media.json'), JSON.stringify(stories), { encoding: 'utf8' });