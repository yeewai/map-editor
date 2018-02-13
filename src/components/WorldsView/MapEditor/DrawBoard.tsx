import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';

interface OwnProps {
    board: any,
    TILE_SIZE: number,
    TILE_HEIGHT: number
}

export type PropTypes = OwnProps;

export class DrawBoard extends React.Component<PropTypes> {
    shouldComponentUpdate(nextProps) {
        return this.props.board !== nextProps.board;
    }

    render() {
        const { board, TILE_SIZE, TILE_HEIGHT } = this.props;
        const TILE_WIDTH_HALF = TILE_SIZE/2;
        const TILE_HEIGHT_HALF = (TILE_SIZE/4) + (TILE_SIZE * 0.04); //The 0.04 is to offset the ground having a thickness

        return (
            <g className="tiles">

                { board.map( (row, x) => (
                    row.map( (col, y) => {
                        const definition = board[x][y]; //world.structures[Math.floor(Math.random() * 4)].definition;
                        if (!definition) { return null; }

                        const ratio =  TILE_SIZE/definition.imageWidth;

                        return (<use className="tile"
                                width={ TILE_SIZE }
                                key={x*1000 + y}
                                x={ x * TILE_WIDTH_HALF - y * TILE_WIDTH_HALF }
                                y={ (x * TILE_HEIGHT_HALF + y * TILE_HEIGHT_HALF) + ((TILE_HEIGHT - (definition.imageHeight * ratio))/2) }
                                xlinkHref={`#${definition.id}`}
                            />

                        )

                    })
                )) }
            </g>
        )
    };
}



export default DrawBoard;
