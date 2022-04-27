# FlagFlipFlag 2017

A small tool my partner and I thought up to help us name flags of the world when all we can remember are the major colors the flag contains.

https://user-images.githubusercontent.com/1573136/165500700-0fa59027-4ce4-46a4-b72f-3b0c6ef64ada.mov

## Development

 - `webpack flagflipflag.js flagflipflag.min.js --watch` – use webpack to compile&watch assets
 - `browser-sync start --server --files ./*.min.js ./*.html` – use browser-sync to serve

## Useful in this project

Shoutouts to other people's code that made this little project achievable:

 - Metafizzy's [Isotope - Filter & sort magical layouts](https://isotope.metafizzy.co) — which handles filtering, sorting and layout animations.
 - [reimertz / flag-colors repository](https://github.com/reimertz/flag-colors) — lists of flags with the percentage of each color they contain.
 - [adriantoine / hex-to-hsl](https://github.com/adriantoine/hex-to-hsl#readme) repository — much easier to deal with colors by their hue in this case.

## Improvement notes

### 2022

1. If I were building this again I would reach for a UI library such as [Vue.js](https://vuejs.org) or [Svelte](https://svelte.dev).
1. Could use a proper coat of CSS paint.
1. Would be great to give the user more control over the range of colors they're looking for
    - Multiple colors
    - Select a color range from a hue wheel (currently colors are bucketed but subjective on my part)
