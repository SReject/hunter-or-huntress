let settings;
try {
    settings = JSON.parse(localStorage.getItem('settings'))
} catch (err) {
    settings = {};
}
let { theme, fontSize, nsfwChapters, nsfwMedia } = settings;
if (theme == null) {
    theme = null;
}
if (fontSize == null || typeof fontSize !== 'number' || fontSize < 0.1) {
    fontSize = 1;
}
if (nsfwChapters !== true && nsfwChapters !== false) {
    nsfwChapters = false;
}
if (nsfwMedia !== true && nsfwMedia !== false) {
    nsfwMedia = false;
}
settings = { theme, fontSize, nsfwChapters, nsfwMedia };
localStorage.setItem('settings', JSON.stringify(settings));

const handlers = {};

export const on = (name, handler, once = false) => {

};
export const once = (name, handler) => on(name, handler, true);

export const off = (name, handler, once = false) => {

};

export const emit = (name, data) => {

};

export const get = (key) => {
    return settings[key];
};

export const set = (key, value) => {
    const pvalue = settings[key];
    settings[key] = value;
    emit('update', { key, previous: pvalue, current: value });
    return value;
};