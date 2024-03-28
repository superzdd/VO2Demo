# VO2 demo Project

More details -> https://git.mediasia.cn/mediasia-interactive/react-test

## Current task list

- [x] GET request to the backend
- [x] adding a history page accessible through a click on a miner in the miner list on the result of the GET /history?minerId=
- [x] display a list according to the design
- [x] connection to the websocket and live updating of the list
- [x] adding a menu to switch between pages
- [x] adding an asteroid page list based on the result of the GET /asteroids
- [x] adding a planet page list based on the result of the GET /planets
- [x] adding a button "Create a miner" to be displayed on a miner whenever it got sufficient ressources
- [] adding a form to create a miner and send the result as a PUSH /miner + Implementation of a form validation

## version

- node v20.10.0
- vue 3.3.10
- vue-router 4.2.5

## project structure

The project uses [ni](https://github.com/antfu/ni), which allows you to install and debug the project by entering commands such as `ni`, `nr`, etc. in the terminal.

`ni` - use the right package manager, you can ignore the difference between `npm`,`yarn`,`pnpm` and so on.

```bash
# install ni first
npm i -g @antfu/ni
```

### install & dev

```bash
# install, like -> npm install
ni
# run dev, like -> npm run dev
nr dev --host
```

### build

`ni` is not support for building, so...let's use `pnpm`

```bash
# build production, generate the "dist" folder.
pnpm build
```
