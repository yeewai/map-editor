import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { TILE_SIZE } from 'conf';
import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';
import { structureDefinitionTypes } from 'services/structureDefinitions';

interface OwnProps {
    structureDefinition: structureDefinitionTypes.StructureDefinition,
    x: number,
    y: number
}

export type PropTypes = OwnProps;

const tileWidthHalf = TILE_SIZE/2;
const tileHeightHalf = (tileWidthHalf * Math.tan( 30 * Math.PI/180)); //Thanks geometry @.@

const getCoords = (x: number, y:number): {x: number, y: number} => {

    return {
        x: (x - y) * tileWidthHalf,
        y: (x + y) * tileHeightHalf
    };
}

const getCoordsString =(x: number, y:number): string => {
    const coords = getCoords(x, y);
    return `${coords.x},${coords.y}`
}

export class DrawTile extends React.Component<PropTypes> {
    shouldComponentUpdate(nextProps) {
        return this.props.structureDefinition !== nextProps.structureDefinition
            || this.props.x !== nextProps.x
            || this.props.y !== nextProps.y;
    }

    render() {
        const { structureDefinition, x, y } = this.props;
        if (!structureDefinition) { return (
            <polygon
                points={[getCoordsString(x, y),getCoordsString(x+1, y),getCoordsString(x+1, y+1),getCoordsString(x, y+1)].join(" ")}
                className="nullTile"  />
        ) }

        const width = getCoords(x+structureDefinition.width, y).x - getCoords(x,y+structureDefinition.length).x;
        const coords = getCoords(
            x,
            y
        );

        const ratio = width/structureDefinition.imageWidth;
        const height = structureDefinition.imageHeight * ratio;

        return (
            <use className="tile"
                width={ width }
                height={height}
                x={ coords.x - (width/2) }
                y={ coords.y - (height) + (tileHeightHalf*2)}
                xlinkHref={`#${structureDefinition.id}`}
            />
        )
    };
}

export default DrawTile;
