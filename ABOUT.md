# About *blox*

**blox** is a sort of "hello, world" experiment in the domain of networked multiplayer games/apps.
It consists of a toroidal grid (i.e. a *PACMAN*-style grid) about which a number of players can move.
A single server maintains the state of all players in the grid, and broadcasts updates (via WebSockets) whenever a player moves.

What possibly sets this app apart from others is an elegant use of WebSockets, server-side `redux`, and some neat middleware.
The state of the app is maintained in a `redux` store on the server, and the server updates the state in the usual fashion: by dispatching actions to the store.
Here is the interesting bit: clients "emit" `redux` actions over their WebSocket connection to the server (this is incredibly straightforward due to the serializability of actions).
The server examines incoming actions, verifies them, and then dispatches the client-sent actions to its store.
Lastly, whenever the server's store is updated, it simply broadcasts the updated state to all of its clients.

There is an interesting pattern here that I wish to investigate further.
We can *almost* think of a client as having not one but *two* dispatch functions (that is, assuming we are using `redux` to manage the client's state as well): one for dispatching actions to the client's state (e.g. for rendering purposes); and another for dispatching actions to the server.
In fact, all the client does is dispatch actions, and some middleware routes them to the right destination, depending on their content.
This blurs the client/server distinction, is incredibly simple to reason about, and also results in a very natural API.
