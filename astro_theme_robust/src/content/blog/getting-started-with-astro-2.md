---
slug: "getting-started-with-astro-2"
title: "Getting Started with Astro"
description: "A brief introduction to Astro and how to get started with it."
date: 2023-06-15
lastmod: 2023-06-20
thumbnail: "/images/astro.jpg"
category: "Web Development"
tags: ["astro", "web", "javascript", "tutorial"]
draft: false
toc: true
---

# Getting Started with Astro

Astro is a modern static site builder that offers excellent performance by shipping zero JavaScript by default. This allows you to build fast websites while still using your favorite UI components and frameworks.

## Why Choose Astro?

Astro provides several benefits for developers:

1. **Performance First**: Astro websites are designed to be lightning-fast. By eliminating unnecessary JavaScript, your site loads quickly and performs well on all devices.

2. **Framework Agnostic**: You can use components from React, Vue, Svelte, Solid, and more - all in the same project! Astro hydrates only when necessary, keeping your site fast.

3. **Content-Focused**: Astro is built with content-heavy websites in mind, making it perfect for blogs, documentation sites, and marketing sites.

4. **Full-Featured**: Astro comes with built-in support for Markdown, MDX, file-based routing, and other essential features.

## Setting Up Your First Astro Project

Getting started with Astro is simple:

```bash
# Create a new project with npm
npm create astro@latest

# Or with yarn
yarn create astro

# Or with pnpm
pnpm create astro
```

Follow the prompts, and you'll have a new Astro project in seconds!

### Project Structure

A typical Astro project has the following structure:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## Creating Pages

In Astro, pages are created in the `src/pages/` directory. Each `.astro` file becomes a route in your website.

```astro
---
// src/pages/about.astro
---

<html lang="en">
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>This is the about page!</p>
  </body>
</html>
```

## Components in Astro

Astro components are reusable pieces of UI. They're written in the `.astro` format, which is similar to HTML but with component-like features:

```astro
---
// src/components/Button.astro
const { text = "Click me!" } = Astro.props
---

<button class="button">
  {text}
</button>

<style>
.button {
  background: #4ca1af;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
```

You can then use this component in your pages:

```astro
---
import Button from "../components/Button.astro"
---

<Button text="Submit" />
```

## Conclusion

Astro is a powerful tool for building modern, content-focused websites. With its unique approach to JavaScript and component rendering, it offers an excellent balance of developer experience and end-user performance.

Start using Astro today and see the difference it can make in your web development workflow!
