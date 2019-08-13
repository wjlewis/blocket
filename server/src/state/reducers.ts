import { Socket } from 'socket.io';
import { List } from 'immutable';
import { Action } from './actions';
import * as actions from './actions';
import { generateFreshId } from '../tools';

/*
 * At the moment, the entire world state simply consists of a number of players
 * in some grid. In turn, each player consists of an id (which doubles as their
 * display name), a position (see `Player`, below), and a "socket" (which
 * represents a WebSockets connection to the client).
 */
export interface State {
  players: List<Player>;
  grid: Grid;
}

export interface Player {
  id: string;
  row: number;
  col: number;
  socket: Socket;
}

export interface Grid {
  rows: number;
  cols: number;
}

const GRID_ROWS = 20;
const GRID_COLS = 30;

const initState: State = {
  players: List(),
  grid: {
    rows: GRID_ROWS,
    cols: GRID_COLS,
  },
};

/*
 * Each new player is initialized at some random location within the grid.
 */
const createPlayer = (id: string, socket: Socket, gridRows: number, gridCols: number): Player => ({
  id,
  row: Math.floor(Math.random() * gridRows),
  col: Math.floor(Math.random() * gridCols),
  socket,
});

const reduce = (state: State=initState, action: Action): State => {
  switch (action.type) {
    case actions.ADD_PLAYER:
      return addPlayer(state, action);
    case actions.REMOVE_PLAYER:
      return removePlayer(state, action);
    case actions.MOVE_PLAYER:
      return movePlayer(state, action);
    default:
      return state;
  }
};

const addPlayer = (state: State, action: Action): State => {
  const socket = action.payload;
  const id = generateFreshId(state.players.map(({ id }) => id).toArray());
  return {
    ...state,
    players: state.players.push(createPlayer(id, socket, state.grid.rows, state.grid.cols)),
  };
};

const removePlayer = (state: State, action: Action): State => ({
  ...state,
  players: state.players.filter(({ socket }) => socket !== action.payload),
});

const movePlayer = (state: State, action: Action): State => {
  /*
   * We know that the player referenced by the ID exists, and that the move
   * to the destination row and column are legal, because of the validation
   * middleware (see ./middlewares.ts).
   */
  const { id, row, col } = action.payload;
  const index = state.players.findIndex(({ id: playerId }) => playerId === id);
  return {
    ...state,
    players: state.players.update(index, player => ({ ...player, row, col })),
  };
};

export default reduce;
