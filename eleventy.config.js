const { DateTime } = require("luxon");
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

// for photoFolder shortCode
const fs = require("node:fs");
const path = require("node:path");

module.exports = async function(eleventyConfig) {
	const {EleventyRenderPlugin, EleventyHtmlBasePlugin} = await import("@11ty/eleventy")

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// for markdown within templates
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	// Shortcodes
	// photoFolder
	eleventyConfig.addShortcode("photoFolder", function (photoFolder, extensions = [".png", ".gif", ".jpg", ".jpeg"]) {
		const html = fs.readdirSync(photoFolder, {withFileTypes: true})
			.filter(file => file.isFile() && extensions.includes(path.extname(file.name)))
			.map((file) => `<img src="${file.name}" width="100%" />`);
		return html.join("\n");
	});

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// formats date shown on post pages, see `postslist.njk` for formatting list
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL d, yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		
		// removing anchor links
		// mdLib.use(markdownItAnchor, {
		// 	permalink: markdownItAnchor.permalink.ariaHidden({
		// 		placement: "after",
		// 		class: "header-anchor",
		// 		symbol: "#",
		// 		ariaHidden: false,
		// 	}),
		// 	level: [1,2,3,4],
		// 	slugify: eleventyConfig.getFilter("slugify")
		// });

		
		
		// footnotes
		const md = markdownIt({
			html: true,
			linkify: true,
		  })
		mdLib.use(require('markdown-it-footnote'));

		// hides brackets for footnotes
		mdLib.renderer.rules.footnote_caption = (tokens, idx) => {
			let n = Number(tokens[idx].meta.id + 1).toString();
		  
			if (tokens[idx].meta.subId > 0) {
			  n += ":" + tokens[idx].meta.subId;
			}
			return n;
		  };
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
