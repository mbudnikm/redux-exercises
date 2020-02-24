# Exercises Training

## install

    npm i

## run tests

    npm t # single run
    npm run test:watch # watch-mode run

## setup

We need two repos:

- this one (tests)
- [mock API](https://github.com/ducin-public/itcorpo-api)
  - `git clone https://github.com/ducin-public/itcorpo-api`
  - `npm i`
  - `npm start` to make the API listen on `localhost:3000`

## info

Test setup uses `jest` and `babel`. Some TC39 Stage 3 proposals are enabled in `.babelrc`

If you want to use TC39 Stage 3 proposals under VS Code, install [_JavaScript and TypeScript Nightly_](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) extension.

## useful resources

- [awesomes](https://github.com/ducin/awesomes)
- nullish coalescing
  - https://v8.dev/features/nullish-coalescing
- immer
  - https://immerjs.github.io/immer/
  - https://en.wikipedia.org/wiki/Copy-on-write
- top-level await:
  - https://github.com/tc39/proposal-top-level-await
  - https://v8.dev/features/top-level-await
  - https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221
- async iterators
  - https://javascript.info/async-iterators-generators
  - https://jakearchibald.com/2017/async-iterators-and-generators/
- shape objects
  - angular optimizations:
    - https://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/
    - https://mrale.ph/blog/2012/06/03/explaining-js-vms-in-js-inline-caches.html
- others:
  - faster JSON.parse: https://twitter.com/mathias/status/1143551692732030979
