# blox API

All `blox` communication happens via a WebSockets connection.
This file documents the various event names and their corresponding payloads that the server and client must be prepared to emit and receive.

## "action"

A client may emit an `"action"` event at any time.
The payload for such an event must always consist of a valid server-side (redux) action.
The server will dispatch this action.
If the action is in any way invalid, the state will not be updated, but instead the server will emit an `"action:error"` event to the client who issued the action.

## "update"

Every time the state is updated, the server issues an `"update"` action, whose payload is the entire (packed) state, to every client.
