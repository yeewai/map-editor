import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { TILE_SIZE } from 'conf';
import { OpenModalButton } from '@evercourse/ever-modal';
import { DrawTile } from './DrawTile';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';
import { mapEditorActions } from 'services/mapEditor';

interface OwnProps {
    board: any
}

interface DispatchProps {
    onMouseEnter: (x: number, y:number) => void,
    onMouseClick: (x: number, y:number) => void
}

export const mapDispatchToProps = ( dispatch: any ) => ({
    onMouseEnter: ( x, y ) => { dispatch(mapEditorActions.setMousePosition(x,y)) },
    onMouseClick: ( x, y ) => { dispatch(mapEditorActions.mouseClick(x,y)) }
})

export type PropTypes = OwnProps & DispatchProps;

export class DrawBoard extends React.Component<PropTypes, any> {
    shouldComponentUpdate(nextProps) {
        return this.props.board !== nextProps.board;
    }

    render() {
        const { board, onMouseEnter, onMouseClick } = this.props;

        return (
            <g className="tiles">
                { board.map( (row, x) => (
                    row.map( (col, y) => (
                        <a onMouseEnter={() => onMouseEnter(x, y)} onMouseDown={() => onMouseClick(x,y)} key={ `x${x}y${y}`}>
                            <DrawTile structureDefinition={board[x][y] && board[x][y].definition} x={x} y={y}/>
                        </a>
                    ))
                )) }
            </g>
        )
    };
}

export default connect<any, DispatchProps, any>(null, mapDispatchToProps)(DrawBoard);
