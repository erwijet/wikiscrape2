const axios = require('axios');

require('dotenv').config();

const WIKI_URL = process.env.WIKI_URL;
const BASE_URL = process.env.BASE_URL;

async function isWikiArticleAsync(str, useWikiPath) {
	let URL = useWikiPath ? BASE_URL + str : WIKI_URL + str;

	return new Promise(resolve => {
		axios.get(URL).then(resolve(true)).catch(resolve(false));
	});
}

module.exports = isWikiArticleAsync;
