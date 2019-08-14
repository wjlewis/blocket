import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import io from 'socket.io-client';
import { State, World } from './state/reducers';
import * as actions from './state/actions';
import BloxWorld from './BloxWorld';

export interface AppProps {
  isReady: boolean;
  socket: null | SocketIOClient.Socket;
  saveSocket: (socket: SocketIOClient.Socket) => void;
  updateWorld: (world: World) => void;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      this.props.isReady
      ? <BloxWorld />
      : <h1>connecting...</h1>
    );
  }

  componentDidMount() {
    /*
     * As soon as the app is mounted, we attempt to connect to the server. If we
     * are successful, we save the connection in the state and set up a number
     * of listeners, the most important of which listens for "update" events
     * from the server.
     */
    const socket: SocketIOClient.Socket = io();
    socket.on('connect', () => {
      this.props.saveSocket(socket);
    });
    socket.on('update', (world: World) => {
      this.props.updateWorld(world);
    });
    socket.on('action:error', (message: string) => {
      console.log(`the desired action could not be dispatched by the server: ${message}`);
    });
    socket.on('disconnect', () => {
      console.log('the server has disconnected');
    });
  }
}

const mapStateToProps = (state: State) => ({
  isReady: state.socket !== null && state.world !== null,
  socket: state.socket,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveSocket: (socket: SocketIOClient.Socket) => dispatch(actions.saveSocket(socket)),
  updateWorld: (world: World) => dispatch(actions.updateWorld(world)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
