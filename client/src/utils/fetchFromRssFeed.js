/* global RSSParser */
import "rss-parser/dist/rss-parser.min.js";

export default async (url) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  let parser = new RSSParser();
  let feed = await parser.parseURL(proxyurl + url);
  return feed;
};
