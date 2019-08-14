import SocketIOClient from 'socket.io-client';
import { World } from './reducers';

export interface Action {
  type: string;
  payload?: any;
}

export const SAVE_SOCKET = 'SAVE_SOCKET';
export const saveSocket = (socket: SocketIOClient.Socket): Action => ({
  type: SAVE_SOCKET,
  payload: socket,
});

export const UPDATE_WORLD = 'UPDATE_WORLD';
export const updateWorld = (world: World): Action => ({
  type: UPDATE_WORLD,
  payload: world,
});

export const PRESS_KEY = 'PRESS_KEY';
export const pressKey = (key: string): Action => ({
  type: PRESS_KEY,
  payload: key,
});

export const MOVE_PLAYER = 'MOVE_PLAYER';
export const movePlayer = (id: string, row: number, col: number): Action => ({
  type: MOVE_PLAYER,
  payload: { id, row, col },
});
