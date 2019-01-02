module.exports = {
    encoding(data) {
        return encodeURIComponent(JSON.stringify(data));
    },
    decoding(str) {
        return JSON.parse(decodeURIComponent(str));
    }
};
