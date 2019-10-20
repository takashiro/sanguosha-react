Sanguosha GUI (React.js) [![Build Status](https://www.travis-ci.org/takashiro/sanguosha-react.svg?branch=dev)](https://www.travis-ci.org/takashiro/sanguosha-react)
==========

| Example Page |  http://sgs.takashiro.cn     |
|--------------|------------------------------|
| Author       |    Kazuichi Takashiro        |


Lisense
-------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

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
1. Clone karuta-node-server and sanguosha-server in the same parent directory.
1. Create a symlink karuta-node-server/extension/sanguosha <----> sanguosha-server
1. Start server application via `npm start` in karuta-node-server. Or click "Launch Program" in sanguosha-server with Visual Studio Code.
1. Run `npm install` and `npm run build` in sanguosha-react.
1. Start client application via ./dist/index.html. Or click "Launch Chrome" in Visual Studio Code.
1. Now you are ready! Type your nickname and start a new game.
