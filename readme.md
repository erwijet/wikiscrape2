# WikiScrape2

WikiScrape2 is a wikipedia crawler that recursivly traverses article links within each article link within each article link... and so on and so forth.

### Setup

Once you have cloned the project, make sure to install all dependencies 

`$ yarn install`

### Configuring the Settings

Then you can configure your scraping session in the `.env` file. The following settings can be changed:

|Property|Description|Default|
|---|---|---|
|`ORIGIN`|The starting article. This article MUST exist and be in lower case. WikiScrape2 will stop immediatly if the `ORIGIN` is not a valid article|cat|
|`DEPTH_LIMIT`|Since every article is going to have at least one link to another article, WikiScrape2 would be scraping forever unless we specifiy a `DEPTH_LIMIT`. This is how many "layers", or articles, deep the scraper should go.|3|
|`ARTICLE_LINK_LIMIT`|A wikipedia article could have hundreds of links to other articles. Setting `ARTICLE_LINK_LIMIT` will restrict the scraper to only looking at the first _n_ elements. For no restriction, this value should be set to `Infinity`|Infinity|
|`ARTICLE_LINK_OFFSET`|How many article links per article to skip before actually looking at links. For example, if `ARTICLE_LINK_OFFSET` was 2, then the first 2 links of each article would be ignored and not traversed.|0|
|`LOGFILE_PATH`|The relative path to a log file where the scraper will log its results. These files should be .txt files.|wikiscrape2_cat_d3_log.txt|

### Runnning the scraper

Once you have changed the settings to your liking, you can run the scraper by calling the start script in the `package.json`

`$ yarn start`

This will take anywhere from a couple minutes to a couple days depending on your settings.