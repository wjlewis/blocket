import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, Player } from './state/reducers';
import * as actions from './state/actions';
import { iota } from './tools';
import './BloxWorld.css';

export interface BloxWorldProps {
  className?: string;
  rows: number;
  cols: number;
  players: Player[];
  pressKey: (key: string) => void;
}

// The width and height of a grid cell, in pixels:
const CELL_SIZE = 25;

class BloxWorld extends React.Component<BloxWorldProps> {
  constructor(props: BloxWorldProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const { rows, cols } = this.props;
    return (
      <div tabIndex={0}
           className={classNames(this.props.className, 'blox-world')}
           onKeyDown={this.handleKeyDown}>
        <svg className="blox-world__grid" width={CELL_SIZE*cols} height={CELL_SIZE*rows} xmlns="http://www.w3.org/2000/svg">
          {this.renderPlayers()}
          {this.renderGridLines()}
        </svg>
      </div>
    );
  }

  private renderPlayers() {
    return this.props.players.map(({ id, row, col }) => (
      <rect className="blox-world__player"
            key={id}
            x={col*CELL_SIZE} y={row*CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} />
    ));
  }

  private handleKeyDown(evt: any) {
    this.props.pressKey(evt.key);
  }

  private renderGridLines() {
    const { rows, cols } = this.props;
    const WIDTH = cols * CELL_SIZE;
    const HEIGHT = rows * CELL_SIZE;
    const rowLines = iota(rows+1).map(row => ({ x1: 0, y1: row*CELL_SIZE, x2: WIDTH, y2: row*CELL_SIZE }));
    const colLines = iota(cols+1).map(col => ({ x1: col*CELL_SIZE, y1: 0, x2: col*CELL_SIZE, y2: HEIGHT }));
    return [...rowLines, ...colLines].map(({ x1, y1, x2, y2 }) => (
      <line className="blox-world__grid-line"
            key={`${x1},${y1},${x2},${y2}`}
            x1={x1} y1={y1} x2={x2} y2={y2} />
    ));
  }
}

const mapStateToProps = (state: State) => ({
  /*
   * It is possible that `state.world` is null; however, in the `App` component,
   * we made sure to not render this component unless it is *not* null. This is
   * not the most confidence-instilling strategy, but it will work for now.
   */
  rows: state.world.grid.rows,
  cols: state.world.grid.cols,
  players: state.world.players,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pressKey: (key: string) => dispatch(actions.pressKey(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BloxWorld);
