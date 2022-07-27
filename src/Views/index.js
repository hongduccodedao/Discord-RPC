console.log('Back-end by aiko-chan-ai');
const regex = /(?<=>)(\s*)(JSON=\S+)(\s*)(?=<\/)/gim;
const loadLang = async (langcode = 'en') => {
    const res = await axios.get(`${document.URL.replace('/rpc', '')}/src/Language/${langcode}.json`);
    console.log(res.data, typeof res.data);
    return res.data;
}
async function replaceAll(lang_ = 'en') {
    let body_ = $('body').html();
    const matches = body_.match(regex).map(text => text.replace(/\s+/gim, '').split('</')[0]);
    console.log(matches);
    const lang = await loadLang(lang_);
    const replaceData = matches.map(key => {
        const value = getValuefromObjectString(lang.html, key.replace('JSON=', ''));
        return {
            orginal: key,
            replace: value
        };
    });
    replaceData.forEach(data => {
        body_ = body_.replace(data.orginal, data.replace);
    });
    $('body').html(body_);
}
const getValuefromObjectString = (obj, str) => {
    const keySplit = str.split('.');
    const result = obj[keySplit[0]];
    if (keySplit.length > 1) {
        return getValuefromObjectString(result, keySplit.slice(1).join('.'));
    }
    return result;
}