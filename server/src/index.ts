import express from 'express';
import http from 'http';
import path from 'path';
import SocketIO from 'socket.io';
import logger from './logger';
import { inProd } from './tools';
import { Action } from './state/actions';
import * as actions from './state/actions';
import store from './state/store';
import pack from './state/pack';

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

/*
 * Because the /build directory is one level up from this one, we need to adjust
 * the path to the /public directory in production.
 */
const dir = `../${inProd() ? '' : '../'}public`;
app.use(express.static(path.join(__dirname, dir)));

/*
 * Each time a new client connects, we do 3 things: we add a new player to the
 * current state, setup a listener to remove the player in the event that they
 * disconnect, and setup a listener to dispatch actions emitted by the client to
 * the store.
 */
io.on('connection', (socket: SocketIO.Socket) => {
  store.dispatch(actions.addPlayer(socket));

  socket.on('disconnect', () => {
    store.dispatch(actions.removePlayer(socket));
  });

  socket.on('action', (action: Action) => {
    store.dispatch(action);
  });
});

/*
 * Lastly, every time the store changes, we want to send the new state to every
 * client.
 */
store.subscribe(() => {
  const players = store.getState().players;
  players.forEach(({ id, socket }) => {
    socket.emit('update', pack(id, store.getState()));
  });
});

const port = process.env.PORT || '8080';
server.listen(port, () => logger.info(`listening on ${port}`));
