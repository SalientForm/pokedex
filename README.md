# Pokedex Assessment

## Features

1. Search with the search bar
2. Click on individual search results to select the Pokemon detail
3. Click on history items to change Pokemon detail selection

## Setup

- Clone the repo
- Install local dependencies `npm i`
- You may have to install **Nx** globally `npm i -g nx`
- Run `nx serve`

## Thoughts 

After completing the challenge I have a sense that the 2 1/2 hour time suggestion is appropriate for the base requirements. 
The bonus items require more time beyond this. The assessment was fun, which is appreciated.

## Choices

1. Load Pokemon index unfront (not the details)
1. Use of fuzzy search was added with fuse.js
1. Use of the scaffolding tool Nx
1. Use of CSS Modules to namespace CSS rules
1. Use of React Bootstrap components to save time

## Potential Next steps

Some enhancements that would be implemented with more time are noted with TODO in the code.

- Add/fix unit tests 
- Consider removing Go button
- Implement queue or a query-library to debounce loading of Pokemon details
- Spend time profiling the app for performance
- Add ability to search by Pokemon id #
- Implement separate view-detail screen 
- Review code for cleanup (remove commented-out code, commit history, etc)
- Generally complete the bonus items listed
