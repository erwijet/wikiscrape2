/**
 * Represents a single Wikipedia article
 * with children as the linked pages
 */
 class WikiNode {
    /** 
     * @param {String} url The url of the article 
     */
    constructor (url) {
        this.url = url;
        this.children = []
    }

    /**
     * Add an article as a node
     * 
     * @param { WikiNode } child The child article to add
     */
    addChild(child) {
        this.children.push(child);
    }
}

module.exports = WikiNode;