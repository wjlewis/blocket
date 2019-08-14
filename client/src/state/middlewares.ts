import { Middleware } from 'redux';
import { Action } from './actions';
import * as actions from './actions';
import { Grid } from './reducers';

/*
 * This middleware redirects movement actions away from the client's store and
 * towards the server's. Instead of calling `next` on the action, we call
 * `socket.emit`; in some sense, this represents a dispatch function for the
 * server's store, since the server immediately dispatches client-sent actions
 * to its store.
 */
export const movePlayer: Middleware = api => next => action => {
  if (!isMoveAction(action)) return next(action);

  const { socket, world: { me, players, grid } } = api.getState();
  const myPlayer = players.find(({ id }) => id === me);

  const { row, col } = myPlayer;

  const nextPos = getNextPos(row, col, grid, action.payload);

  /*
   * We do NOT dispatch the action on the client, but instead to the server's
   * store. The server will then process it and broadcast an update.
   */
  return socket.emit('action', actions.movePlayer(me, nextPos.row, nextPos.col));
};

/*
 * Determining the next position is simply a matter of switching on the
 * direction and adding or subtracting 1 (and taking the appriate remainder).
 */
const getNextPos = (row: number, col: number, grid: Grid, key: string) => {
  switch (key) {
    case 'ArrowLeft':
      return { row, col: (col - 1 + grid.cols) % grid.cols };
    case 'ArrowRight':
      return { row, col: (col + 1) % grid.cols };
    case 'ArrowUp':
      return { row: (row - 1 + grid.rows) % grid.rows, col };
    case 'ArrowDown':
      return { row: (row + 1) % grid.rows, col };
    default:
      return { row, col };
  }
};

const isMoveAction = (action: Action) => (
  action.type === actions.PRESS_KEY
  &&
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(action.payload)
);
