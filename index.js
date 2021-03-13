const wiki = require('./wiki/wiki');
const fs = require('fs');
const { performance } = require('perf_hooks'); // timing

require('dotenv').config();

const {
	ORIGIN,
	LOG_FILE,
	DEPTH_LIMIT,
	ARTICLE_LINK_LIMIT,
	ARTICLE_LINK_OFFSET
} = process.env;

const LOG_FILE_PATH = __dirname + '/' + LOG_FILE;

async function dls(visited, node, depth) {
	if (!visited.includes(node) && depth <= DEPTH_LIMIT) {
		visited.push(node);
		fs.appendFileSync(
			LOG_FILE_PATH,
			`${(() => {
				let str = '';
				for (let i = 0; i < depth; i++) {
					str += '  ';
				}
				return str;
			})()}[d${depth}] ${node} \n`
		);

		const links = await wiki.getWikiPageLinks(node);

		let i = 0;
		for await (let url of links) {
			if (i++ >= ARTICLE_LINK_OFFSET && i <= ARTICLE_LINK_LIMIT)
				await dls(visited, url, depth + 1);
		}
	}
}

(async () => {
	const t0 = performance.now();
	if (fs.existsSync(LOG_FILE_PATH)) fs.unlinkSync(LOG_FILE_PATH);
	await dls([], '/wiki/' + ORIGIN, 1);

	// write file footer
	const t = ((performance.now() - t0) / 60000).toFixed(2);
	fs.appendFileSync(LOG_FILE_PATH, `\n\n[✔] Scrape Finished in ${t} min`);
})();
