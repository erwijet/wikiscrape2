const axios = require('axios');
const cheerio = require('cheerio');
const isWikiArticleAsync = require('./isWikiArticle');

require('dotenv').config();

const { BASE_URL, origin } = process.env;

function validateHref(href) {
	if (!href) return false; // assert href exists
	if (href.substr(0, 5) != '/wiki') return false; // assert href begins with '/wiki'

	const EXPLICIT_DENY_LIST = [
		'wikipedia',
		'encyl', // reject encylpedia entries (frequent in refrences page)
		'#', // reject cite notes (links to page headers, not other articles)
		'.', // reject attached files (images, sounds, etc...)
		':', // reject links to special pages (forums, chatpages, etc) as per http://en.wikipedia.org/robots.txt
		'main_page',
		',', // reject commas, they trip up the URL parser
		origin.toLowerCase() // dont link back to our starting point. That would be stupid
	];

	let isValid = true;
	EXPLICIT_DENY_LIST.forEach(item => {
		if (href.toLowerCase().includes(item)) isValid = false;
	});

	return isValid;
}

async function getWikiPageLinks(expr) {
	// validate expression is actually a wiki article
	const isWikiArticle = await isWikiArticleAsync(expr, true);
	if (!isWikiArticle) return [];

	// fetch data
	const URL = BASE_URL + expr;
	const $ = cheerio.load((await axios.get(URL)).data);

	// parse data
	return Object.values($('a'))
		.map(elem => elem.attribs?.href)
		.filter(validateHref);
}

module.exports = getWikiPageLinks;
