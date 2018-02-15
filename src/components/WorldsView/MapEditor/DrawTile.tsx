import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { TILE_SIZE } from 'conf';
import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';

interface OwnProps {
    structure: worldTypes.Structure,
    x: number,
    y: number
}

export type PropTypes = OwnProps;

const getCoords = (x: number, y:number): {x: number, y: number} => {
    const TILE_WIDTH_HALF = TILE_SIZE/2;
    const TILE_HEIGHT_HALF = (TILE_WIDTH_HALF * Math.tan( 30 * Math.PI/180)); //Thanks geometry @.@

    return {
        x: (x * TILE_WIDTH_HALF - y * TILE_WIDTH_HALF),
        y: (x * TILE_HEIGHT_HALF + y * TILE_HEIGHT_HALF)
    };
}

export class DrawTile extends React.Component<PropTypes> {
    shouldComponentUpdate(nextProps) {
        return this.props.structure !== nextProps.structure;
    }

    render() {
        const { structure, x, y } = this.props;
        if (!structure) { return null; }

        const { definition } = structure;
        const width = getCoords(x+definition.width, y).x - getCoords(x,y+definition.length).x;
        const coords = getCoords(x,y)

        const ratio =  TILE_SIZE/definition.imageWidth;

        return (
            <use className="tile"
                width={ width }

                x={ coords.x }
                y={ coords.y - (definition.imageHeight * ratio)}
                xlinkHref={`#${definition.id}`}
            />
        )
    };
}

export default DrawTile;
