import { State, Grid } from './reducers';

/*
 * The packaged state includes all of the relevant world information, along with
 * the ID of the player associated with the recipient client (the client may
 * very well like to know their own ID for display purposes).
 */
export interface PackedState {
  me: string;
  players: PackedPlayer[];
  grid: Grid;
}

export interface PackedPlayer {
  id: string;
  row: number;
  col: number;
}

/*
 * Before sending the state to a client, we remove some extraneous information
 * (for instance, the `socket` property for each player) to reduce the payload
 * size, and clutter.
 */
const pack = (myId: string, state: State): PackedState => ({
  me: myId,
  players: state.players.map(({ id, row, col }) => ({ id, row, col })).toArray(),
  grid: state.grid,
});

export default pack;
