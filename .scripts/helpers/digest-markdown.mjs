const digestEscape = (state) => {
    const { line, position } = state;
    if (
        line[position] !== '\\' ||
        (position + 1) === line.length
    ) {
        return false;
    }
    state.position += 2;
    return {
        type: 'escape',
        data: line[position + 1]
    };
}

const digestFormatting = (type, signatures, state) => {
    const { line, position } = state;
    const maxPosition = line.length - 1;
    for (const sig of signatures) {
        let pos = position,
            sigLen = sig.length;
        if (line.slice(pos, pos + sigLen) !== sig) {
            continue;
        }
        pos += sigLen;
        if ((pos + sigLen) > maxPosition) {
            continue;
        }

        let innerText = '';
        while (pos <= maxPosition) {

            // closing signature
            if (line.slice(pos, pos + sigLen) === sig) {
                state.position = pos + sigLen;
                return {
                    type,
                    data: digestText({ line: innerText, position: 0 })
                };
            }

            // end of line
            if (pos === maxPosition) {
                break;
            }

            innerText += line[position];
            pos += 1;
        }
    }
    return false;
};

const digestBold = digestFormatting.bind(null, 'bold', ['**', '__']);
const digestItalic = digestFormatting.bind(null, 'italic', ['*', '_']);
const digestStrike = digestFormatting.bind(null, 'strike', ['~~']);

const digestText = (state) => {
    const result = [];

    let text = '';
    while (state.position < state.line.length) {

        const escaped = digestEscape(state);
        if (escaped) {
            if (text !== '') {
                text += escaped.data;

            } else if (result.length && result.at(-1).type === 'text') {
                result.at(-1).text += escaped.data;

            } else {
                result.push({ type: 'text', data: escaped.data});
            }
            continue;
        }

        const formatted = digestBold(state) || digestItalic(state) || digestStrike(state);
        if (formatted) {
            if (text !== '') {
                result.push({ type: 'text', data: text });
                text = '';
            }
            result.push(formatted);
            continue;
        }

        text += state.line[state.position];
        state.position += 1;
    }

    if (text !== '') {
        result.push({ type: 'text', data: text });
    }

    return result;
}


export default ((content) => {
    const contexts = [];
    let lines = [];
    content
        .trim()
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .split(/ *\n+ */g)
        .forEach(line => {
            if (line.trim() === '') {
                return;
            }
            if (line === '***') {
                if (lines.length) {
                    contexts.push(lines);
                    lines = [];
                }
                return;
            }
            lines.push(digestText({ line, position: 0 }));
        });

    if (lines.length) {
        contexts.push(lines);
    }

    return contexts;
});