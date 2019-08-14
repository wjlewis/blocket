import SocketIOClient from 'socket.io-client';
import { Action } from './actions';
import * as actions from './actions';

/*
 * In order to communicate with the server, we need a WebSockets connection; we
 * also need to know what the current "world" looks like (e.g. the positions of
 * every player) in order to render it. Thus, we keep both of these in the state.
 */
export interface State {
  socket: null | SocketIOClient.Socket;
  world: null | World;
}

/*
 * Whenever the server sends an "update" event, it sends the current "world" as
 * the payload. This includes this client's ID, the current grid information,
 * and any information required to render all of the players.
 */
export interface World {
  me: string;
  players: Player[];
  grid: Grid;
}

export interface Player {
  id: string;
  row: number;
  col: number;
}

export interface Grid {
  rows: number;
  cols: number;
}

const initState: State = {
  socket: null,
  world: null,
};

const reduce = (state: State=initState, action: Action): State => {
  switch (action.type) {
    case actions.SAVE_SOCKET:
      return saveSocket(state, action);
    case actions.UPDATE_WORLD:
      return updateWorld(state, action);
    default:
      return state;
  }
}

const saveSocket = (state: State, action: Action): State => ({
  ...state,
  socket: action.payload,
});

const updateWorld = (state: State, action: Action): State => ({
  ...state,
  world: action.payload,
});

export default reduce;
