import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_DESCRIPTION, SITE_TITLE, AUTHOR_NAME } from "../config"
import { render } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => {
		return !data.draft; // Only published posts
	});
	
	// Sort by date (newest first)
	const sortedPosts = posts.sort(
		(a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
	);
	
	// Process content for each post
	const processedPosts = await Promise.all(
		sortedPosts.map(async (post) => {
			// Generate content
			let content = '';
			
			try {
				// Try to generate rendered content with Markdown
				const { Content } = await render(post);
				content = Content.toString();
			} catch (error) {
				// Fallback to body if rendering fails
				content = post.body;
			}
			
			// Return formatted item
			return {
				title: post.data.title,
				description: post.data.description || post.body?.substring(0, 200) || "",
				pubDate: post.data.date,
				link: `/${post.data.slug}/`,
				content: content,
				categories: post.data.tags || [],
				author: AUTHOR_NAME,
				customData: post.data.category ? 
					`<category>${post.data.category}</category>` : ''
			};
		})
	);
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: processedPosts,
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
			content: "http://purl.org/rss/1.0/modules/content/",
			dc: "http://purl.org/dc/elements/1.1/"
		},
		customData: `<language>en-us</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`
	});
}
