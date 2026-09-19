# Fares Whby portfolio

Static HTML, CSS, and JavaScript. No installation, build step, backend, or package dependencies.

## Where to edit

- `projects-data.js`: the single source for project titles, categories, summaries, descriptions, and image lists. Both the home grid and project pages use it.
- `project.html`: shared layout for every project page.
- `projects.js`: renders the grid and project content and handles card expansion.
- `images/projects/<slug>/`: each project's photographs and drawings.
- `templatemo-631-kinetic-style.css`: shared styling.

The current nine projects contain template content, not real architectural project claims. Replace their titles, descriptions, categories, images, and image alternative text before publishing as a real portfolio.

## Edit or add a project

1. Put images in a folder such as `images/projects/courtyard-house/`. Use web-friendly image sizes and lowercase filenames.
2. Edit an existing object in `projects-data.js`, or copy an object to add another project. Separate objects with commas.
3. Give it a unique, stable `slug`, such as `courtyard-house`. Use lowercase letters, numbers, and hyphens. Changing a slug changes its URL.
4. Set the title, category, summary, cover path, and descriptive `coverAlt`. Each entry in `paragraphs` becomes a paragraph.
5. Add gallery entries like this:

```js
"gallery": [
  {
    "src": "images/projects/courtyard-house/interior.jpg",
    "alt": "Living room opening onto the planted courtyard",
    "caption": "The courtyard brings daylight into the living spaces."
  },
  {
    "src": "images/projects/courtyard-house/plan.jpg",
    "alt": "Ground-floor plan showing rooms around the central courtyard",
    "caption": "Ground-floor plan"
  }
]
```

Project ordering follows the data file. The grid adds rows automatically; for a large portfolio, a curated selection or category filtering would be a useful next step. To remove a project, remove its object from the data file.

## URLs and hosting

A project opens at `project.html?project=courtyard-house`. This shared HTML page reads the slug and displays the matching content. Unknown or missing slugs show a friendly message and a link back. Links and assets are relative, so they also work under a GitHub Pages repository subdirectory.

Open `index.html` locally for a preview, or serve the directory with `python -m http.server 8000` and visit `http://localhost:8000`.

Publish through the repository's existing GitHub Pages workflow. No new hosting configuration is needed. Changes have not been pushed automatically.

## Why this structure?

One HTML file per project is initially simple, but repeats the layout and makes site-wide changes tedious. This version keeps content in one place without introducing a build tool. It requires JavaScript to display projects. If search visibility, per-project social previews, or clean URLs like `/projects/courtyard-house/` become priorities, a static-site generator can produce a real HTML page per project from shared templates and content. Those features are not implemented here.


## Sharing previews and favicon

Both `index.html` and `project.html` include static Open Graph and social-card metadata in their `<head>`. Edit those tags to change the sharing title, description, or image. The preview currently uses `images/3.png`, with absolute URLs for `https://fareswhby.github.io`. Update those URLs if the hosting domain changes.

Project links currently share the same general portfolio preview; they do not have project-specific previews. The project page intentionally omits a fixed `og:url` so it does not declare every query-string project link to be the homepage.

`favicon.png` at the repository root is a solid black 32 x 32 PNG placeholder. Replace it with a square PNG of the same size and filename to change the browser-tab icon. It is separate from the sharing-preview image.

These changes must be published before public previews can use them. Browsers and messaging apps may cache old icons and link previews.
