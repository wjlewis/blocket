import { Socket } from 'socket.io';

export interface Action {
  type: string;
  payload?: any;
}

/*
 * There are only a few things that a player can do: they can be created,
 * removed, and they can change their position.
 */
export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (socket: Socket): Action => ({
  type: ADD_PLAYER,
  payload: socket,
});

export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const removePlayer = (socket: Socket): Action => ({
  type: REMOVE_PLAYER,
  payload: socket,
});

export const MOVE_PLAYER = 'MOVE_PLAYER';
export const movePlayer = (id: string, row: number, col: number): Action => ({
  type: MOVE_PLAYER,
  payload: { id, row, col },
});
