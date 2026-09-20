# NOVA Website

Official NOVA AI website — futuristic landing page, responsive mobile design, animated NOVA Core, feature showcase, and direct Android download.

## Android releases

The website expects the latest GitHub Release to contain an asset named:

`NOVA.apk`

The download button uses:

`/releases/latest/download/NOVA.apk`

and automatically reads the latest release tag from GitHub to display the current version.

## GitHub Pages

A workflow is included at `.github/workflows/pages.yml`. Enable GitHub Pages in the repository settings and select **GitHub Actions** as the source.

## Project

- `index.html` — website structure
- `styles.css` — futuristic responsive UI
- `script.js` — animations, reveal effects, and latest-release lookup
- `assets/nova-mark.svg` — NOVA icon
