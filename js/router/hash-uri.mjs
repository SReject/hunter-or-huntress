export default (hashStr => {
    const matched = /^#?([^\?#]+)((?:\?[^#]*)?)((?:\#[\s\S]*)?)$/.exec(hashStr);

    if (!matched) {
        return;
    }

    const [_, resource, queryParameters, hash] = matched;

    // Digest resource
    const path = resource
        .replace(/(?:^[\\\/]+)|(?:[\\\/]+$)/g, '')
        .split(/[\\\/]+/g)
        .filter(part => (part != null && part !== '' && part !== '.'));

    let idx = 0;
    while (idx < path.length) {
        if (path[idx] !== '..') {
            path[idx] = decodeURI(path[idx]);
            idx += 1;

        } else if (idx > 0) {
            idx -= 1;
            path.splice(idx, 2);

        } else {
            path.shift();
        }
    }

    // Digest query parameters
    const params = queryParameters
        .slice(1)
        .split(/&+/g)
        .filter(param => (param != null && param !== ''))
        .map(param => {
            const [key, value] = param.split(/=/);
            return {
                key: decodeURI(key),
                value: (value != null && value !== '' ? value : '')
            }
        });

    // Return digested hash uri
    return { path, params, hash }
});