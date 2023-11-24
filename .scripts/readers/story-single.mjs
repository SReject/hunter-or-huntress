import { readFile } from 'fs/promises';

import { quantifyPath as quantify } from '../helpers/index.mjs';
import digestMarkdown from '../helpers/digest-markdown.mjs';

export default async (path, entry) => {
    const entryPath = quantify(path, './story.md');

    let content;
    try {
        content = await readFile(entryPath, { encoding: 'utf8' });
    } catch {
        throw new Error(`Failed to read story: ${entryPath}`);
    }

    entry.content = digestMarkdown(content);

    entry.creator = entry.author;
    delete entry.author;

    return entry;
};