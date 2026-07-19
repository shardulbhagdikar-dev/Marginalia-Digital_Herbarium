# Marginalia — A Digital Herbarium

A small static website built as a practice lab for parsing HTML and
working with the DOM in JavaScript. It's themed as a fictional digital
herbarium — a catalogue of pressed plant specimens — since that gives
plenty of realistic structure (tables, cards, forms, lists) to select,
read, and manipulate.

## Why this exists

This site was built to have something concrete to practice on: reading
HTML tags, querying elements, and reacting to user input with plain
JavaScript. Rather than a blank sandbox, it's a small "real" site with
enough varied markup (ids, classes, `data-*` attributes, semantic tags)
to make DOM exercises feel like they're solving an actual problem.

## Pages

- **`index.html`** — Home. Intro copy, an animated stat counter, and a
  grid of featured specimen cards.
- **`collection.html`** — The full specimen catalogue as an HTML table,
  with a live text search and status filter buttons.
- **`field-notes.html`** — A submission form for logging a new sighting,
  with client-side validation and feedback.

## Files

| File          | Purpose                                             |
|---------------|------------------------------------------------------|
| `index.html`       | Home page markup                                |
| `collection.html`  | Specimen table + search/filter UI               |
| `field-notes.html` | Submission form                                 |
| `styles.css`       | Shared design system for all three pages        |
| `script.js`        | All JS, split into five commented, independent blocks |

## `script.js` at a glance

Each block only runs if its target element exists, so the one file is
shared safely across all three pages:

1. Sets the footer's copyright year (`textContent`)
2. Closes the mobile nav menu after a link is clicked
3. Animates the home page stat counter from a `data-target` attribute
4. Powers the collection page's live search + status filtering
5. Validates and gives feedback on the field notes form

## Running it locally

No build step or dependencies — just open `index.html` in a browser, or
serve the folder so relative paths and fonts load cleanly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
