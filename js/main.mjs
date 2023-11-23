const getJSONData = async (name) => {
    try {
        const response = await fetch(`./data/${name}.json`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Unable to retrieve ${name}}`);
        }
        return {
            status: 'ok',
            data: await response.json()
        };
    } catch (error) {
        return {
            status: 'error',
            data: error
        }
    }
}
const [creators, stories, media] = Promise.all([
    getJSONData('creators'),
    getJSONData('stories'),
    getJSONData('media')
]);

