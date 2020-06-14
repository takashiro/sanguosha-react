Sanguosha GUI (React.js) [![Build Status](https://www.travis-ci.org/takashiro/sanguosha-react.svg?branch=dev)](https://www.travis-ci.org/takashiro/sanguosha-react)
==========

| Example Page |  http://sgs.takashiro.cn     |
|--------------|------------------------------|
| Author       |    Kazuichi Takashiro        |


Introduction
------------

It's a GUI client application of the famous board game [Legends of the Three Kingdoms](https://en.wikipedia.org/wiki/Legends_of_the_Three_Kingdoms) based on React.js.

It connects to the server application via WebSocket.


Running Environment
-------------------
1. Node.js v10 or later versions
1. [karuta-node-server](https://github.com/takashiro/karuta-node-server)
1. [sanguosha-server](https://github.com/takashiro/sanguosha-server)

Build and Run
-------------
1. You'll need 3 repositories to debug the project, including [karuta-node-server](https://github.com/takashiro/karuta-node-server), [sanguosha-server](https://github.com/takashiro/sanguosha-server) and `sanguosha-react` (this repository). The 3 repositories should be in the same folder.
1. Clone [karuta-node-server](https://github.com/takashiro/karuta-node-server).
1. Enter `karuta-node-server`.
1. Run `npm i` and `npm run build`
1. Clone [sanguosha-server](https://github.com/takashiro/sanguosha-server).
1. Enter `sanguosha-server`.
1. Run `npm i` and `npm run build`
1. Create a symlink `karuta-node-server/extension/sanguosha` <----> `sanguosha-server/dist`
1. Open `sanguosha-server` with Visual Studio Code.
1. Click `Launch` to start the server.
1. Open `sanguosha-react` with Visual Studio Code.
1. Run `npm start` to start webpack.
1. Click `Launch (http)`.
1. Now you are ready! Type your nickname and start a new game.
