import { Middleware } from 'redux';
import * as actions from './actions';
import logger from '../logger';

/*
 * Before a player is permitted to make a move, we must verify two things:
 * first, that the player with the given ID actually exists, and second, that
 * the move is to a position that is adjacent to the player's current position.
 */
export const validateMove: Middleware = api => next => action => {
  if (action.type !== actions.MOVE_PLAYER) return next(action);

  const { players } = api.getState();

  const { id } = action.payload;
  const player = players.find(({ id: playerId }) => playerId === id);

  if (!player) {
    logger.info(`No player with ID "${id}"`);
    // TODO: find a way to report this error to the client
    return; // Don't dispatch the action!
  }

  // TODO: Verify that move is adjacent, and emit "action:error" if not

  next(action);
};

export const log: Middleware = api => next => action => {
  logger.info('action', action.type);
  next(action);
  logger.info('updated state', api.getState());
};
