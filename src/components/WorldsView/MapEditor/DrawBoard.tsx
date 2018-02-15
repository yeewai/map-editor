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

interface OwnProps {
    board: any
}

export type PropTypes = OwnProps;

export class DrawBoard extends React.Component<PropTypes> {
    shouldComponentUpdate(nextProps) {
        return this.props.board !== nextProps.board;
    }

    render() {
        const { board } = this.props;

        return (
            <g className="tiles">
                { board.map( (row, x) => (
                    row.map( (col, y) => (
                        <DrawTile structure={board[x][y]} x={x} y={y} key={ `x${x}y${y}`}/>
                    ))
                )) }
            </g>
        )
    };
}

export default DrawBoard;
