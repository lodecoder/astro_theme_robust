# Robust Astro Theme

A port of the [Robust Hugo Theme](https://github.com/dim0627/hugo_theme_robust) for Astro.

## Features

- Responsive design
- Grid-based layout
- Article thumbnails
- Syntax highlighting
- SEO optimized with structured data
- Categories and tags support
- Author profile
- Previous/next article navigation
- Table of contents support
- Schema.org JSON-LD
- OpenGraph and Twitter Card support

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm, yarn, or pnpm

### Installation

1. Create a new Astro project using this theme:

```bash
# Using npm
npm create astro@latest -- --template username/robust-astro-theme

# Or using yarn
yarn create astro --template username/robust-astro-theme

# Or using pnpm
pnpm create astro --template username/robust-astro-theme
```

2. Navigate to the project directory and install dependencies:

```bash
cd my-robust-site
npm install
```

3. Start the development server:

```bash
npm run dev
```

Visit http://localhost:4321 to see your site.

## Project Structure

```
/
├── public/           # Static assets
│   └── images/       # Image files
├── src/
│   ├── components/   # Reusable UI components
│   ├── content/      # Content collections (blog posts)
│   ├── layouts/      # Page layouts
│   ├── pages/        # Page routes
│   └── styles/       # CSS styles
├── astro.config.mjs  # Astro configuration
└── package.json      # Project dependencies
```

## Content Structure

Blog posts are stored in the `src/content/blog/` directory as Markdown or MDX files. Each post should include frontmatter metadata:

```yaml
---
title: "Post Title"
description: "Brief description for SEO and previews"
date: 2023-06-15
lastmod: 2023-06-20  # Optional
thumbnail: "/images/post-image.jpg"  # Optional
category: "Web Development"  # Optional
tags: ["astro", "web", "javascript"]  # Optional
draft: false  # Optional, defaults to false
toc: true  # Optional, defaults to false
---

Your post content goes here...
```

## Configuration

### Site Configuration

You can customize your site by modifying these files:

- `src/components/Header.astro`: Site title and description
- `src/components/Footer.astro`: Footer content
- `src/components/Author.astro`: Author information
- `astro.config.mjs`: Astro configuration including site URL

### Styling

The theme uses standard CSS files:

- `src/styles/global.css`: Main styles
- `src/styles/author.css`: Author component styles

## Customization

### Adding a Custom Font

1. Add your font link to `src/layouts/BaseLayout.astro`:

```astro
<link href="https://fonts.googleapis.com/css?family=YourFont:400,700" rel="stylesheet" />
```

2. Update the font in `src/styles/global.css`:

```css
body {
  font-family: 'YourFont', sans-serif;
}
```

### Changing Colors

You can modify the colors in `src/styles/global.css`.

## Credits

- Original Hugo theme: [Robust](https://github.com/dim0627/hugo_theme_robust) by [Daisuke Tsuji](http://yet.unresolved.xyz/)
- Ported to Astro by: [Your Name]

## License

This theme is released under the MIT License. See the LICENSE file for details.
