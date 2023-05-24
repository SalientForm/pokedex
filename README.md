# Pokedex Assessment

## Features

1. Search with the search bar to search by name
2. Click on individual search results to view the Pokemon detail
3. Click on history items to view previously viewed Pokemon

## Choices

1. The index of all Pokemon is loaded unfront (not the details) to enable fuzzy search
1. Fuzzy search has been implemented with [fuse.js](https://fusejs.io/)
1. Use of the scaffolding tool [Nx](https://nx.dev/)
1. Use of [CSS Modules](https://github.com/gajus/react-css-modules) to namespace CSS rules
1. Use of [React Bootstrap components](https://react-bootstrap.github.io/)

## Setup

- Clone the repo
- Install local dependencies `npm i`
- Run `nx serve`

## Next steps

- Add unit tests to reach good coverage
- Implement queue or a query-library to debounce loading of Pokemon details
- Add ability to search by Pokemon id #
- Implement separate view-detail screen  
- Generally complete the bonus items listed
