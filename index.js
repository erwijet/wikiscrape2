const { createNamedExports } = require('typescript');
const wiki = require('./wiki/wiki');
const { WikiNode } = wiki;
const fs = require('fs');

require('dotenv').config();

const { origin } = process.env;

let tree = new WikiNode(1);
tree.addChild(new WikiNode(2));
tree.addChild(new WikiNode(3));
tree.addChild(new WikiNode(4));

tree.children[0].addChild(new WikiNode(5));
tree.children[1].addChild(new WikiNode(6));
tree.children[1].children[0].addChild(new WikiNode(7));

const DEPTH_LIMIT = 3; // no more than 3 articles deep

async function dls(visited, node, depth) {
	if (!visited.includes(node) && depth <= DEPTH_LIMIT) {
		visited.push(node);
		fs.appendFileSync(
			__dirname + '/wikiscrape2_LOG.txt',
			`[${depth}] ${node} \n`
		);
		// console.log(depth, node);

		// if (trace.length >= DEPTH_LIMIT) return;
		const links = await wiki.getWikiPageLinks(node);
		// console.log(links);

		for await (let url of links) {
			await dls(visited, url, depth + 1);
		}

		// node.children.forEach(c => dfs(visited, c, trace));
	}
}

(async () => {
	fs.unlinkSync(__dirname + '/wikiscrape2_LOG.txt');
	await dls([], '/wiki/' + origin, 1);
})();
