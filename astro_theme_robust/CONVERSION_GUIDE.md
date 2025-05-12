# Hugo to Astro Conversion Guide

This document explains how the Robust Hugo theme was converted to Astro, detailing the mapping between Hugo templates and Astro components.

## Core Concepts

### Template to Component Mapping

| Hugo Template | Astro Component |
|---------------|----------------|
| baseof.html | BaseLayout.astro |
| partials/header.html | Header.astro |
| partials/footer.html | Footer.astro |
| partials/author.html | Author.astro |
| partials/latests.html | LatestPosts.astro |
| partials/categories.html | Categories.astro |
| partials/tags.html | Tags.astro |
| partials/taxonomy.html | Taxonomy.astro |
| partials/share.html | Share.astro |
| partials/meta.html & single_meta.html | Meta.astro |
| _default/list.html | PostList.astro |
| _default/li.html | PostListItem.astro |
| _default/li_sm.html | PostListItemSmall.astro |
| _default/single.html | SinglePost.astro |
| shortcodes/img.html | Img.astro |

### Directory Structure Changes

- Hugo's `/layouts/` → Astro's `/src/layouts/` and `/src/components/`
- Hugo's `/assets/` → Astro's `/src/styles/`
- Hugo's content organization → Astro's `/src/content/blog/`
- Hugo's `/static/` → Astro's `/public/`

## Key Conversion Points

### 1. Template Language Changes

**Hugo:**
```html
{{ define "main" }}
  {{ .Content }}
{{ end }}
```

**Astro:**
```astro
---
// Component script
---

<slot />
```

### 2. Data Access

**Hugo:**
```html
{{ .Title }}
{{ .Date.Format "Jan 2, 2006" }}
{{ range .Site.RegularPages }}
  {{ .Permalink }}
{{ end }}
```

**Astro:**
```astro
{post.data.title}
{new Date(post.data.date).toLocaleDateString()}
{posts.map(post => (
  <a href={`/${post.slug}/`}>{post.data.title}</a>
))}
```

### 3. Layouts & Templates

**Hugo:**
```html
{{ define "main" }}
  <!-- content -->
{{ end }}
```

**Astro:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <!-- content -->
</BaseLayout>
```

### 4. Partials & Components

**Hugo:**
```html
{{ partial "header.html" . }}
```

**Astro:**
```astro
---
import Header from '../components/Header.astro';
---

<Header />
```

### 5. Styling Approach

**Hugo:**
```scss
// assets/styles.scss
html {
  font-size: 18px;
}
```

**Astro:**
```css
/* styles/global.css */
html {
  font-size: 18px;
}
```

### 6. Content Organization

**Hugo:**
Content is organized in `/content/` with front matter.

**Astro:**
Content uses Astro's Content Collections in `/src/content/blog/` with schema validation.

## Specific Component Conversions

### Base Layout

**Hugo:**
```html
<!DOCTYPE html>
<html>
  <head>{{ partial "meta.html" . }}</head>
  <body>
    {{ partial "header.html" . }}
    <main>{{ block "main" . }}{{ end }}</main>
    {{ partial "footer.html" . }}
  </body>
</html>
```

**Astro:**
```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- meta tags -->
  </head>
  <body>
    <Header />
    <main><slot /></main>
    <Footer />
  </body>
</html>
```

### Templates to Pages

**Hugo:**
Pages are generated from templates in `/layouts/`.

**Astro:**
Pages are explicitly created in `/src/pages/` with dynamic routes:

```astro
---
// src/pages/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
---
```

### Shortcodes to Components

**Hugo:**
```html
{{< img src="image.jpg" caption="Caption" >}}
```

**Astro:**
```astro
<Img src="image.jpg" caption="Caption" />
```

## Advanced Mapping

### Pagination

**Hugo:**
```html
{{ if or (.Paginator.HasPrev) (.Paginator.HasNext) }}
<nav class="paging">
  {{ if .Paginator.HasPrev }}
  <a href="{{ .Paginator.Prev.URL }}" rel="prev">Prev</a>
  {{ end }}
  {{ if .Paginator.HasNext }}
  <a href="{{ .Paginator.Next.URL }}" rel="next">Next</a>
  {{ end }}
</nav>
{{ end }}
```

**Astro:**
```astro
{page && (page.url.prev || page.url.next) && (
  <nav class="paging">
    {page.url.prev && (
      <a href={page.url.prev} rel="prev">Prev</a>
    )}
    {page.url.next && (
      <a href={page.url.next} rel="next">Next</a>
    )}
  </nav>
)}
```

### Taxonomies (Categories & Tags)

**Hugo:**
Built-in taxonomy system.

**Astro:**
Custom implementation using content collections and dynamic routes:

```astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const tags = [...new Set(posts.flatMap(post => post.data.tags || []))];
  
  return tags.map(tag => ({
    params: { tag: tag.toLowerCase().replace(/\s+/g, '-') },
    props: { tag, posts: posts.filter(post => 
      post.data.tags && post.data.tags.includes(tag)
    )},
  }));
}
```

## Performance Considerations

- Astro ships zero JavaScript by default, improving performance
- Components are rendered at build time
- Hydration can be added only where needed with client directives

## SEO & Metadata

- Hugo's built-in SEO features were replaced with custom Astro components
- Schema.org JSON-LD data is generated in the Meta component
- OpenGraph and Twitter Card metadata is preserved

## Final Considerations

1. **Content Migration**: Content needs to be migrated and adapted to Astro's content collections.
2. **URL Structure**: Maintain the same URL structure for SEO.
3. **Custom Shortcodes**: All Hugo shortcodes need to be converted to Astro components.
4. **CSS Processing**: Hugo's SCSS pipeline replaced with standard CSS.
5. **JavaScript**: Any theme JavaScript needs to be adapted to Astro's partial hydration model.

This conversion maintains the design and functionality of the original Hugo theme while leveraging Astro's modern architecture and performance benefits.
