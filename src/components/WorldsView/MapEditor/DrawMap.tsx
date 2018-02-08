import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';


import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';

export type OwnProps  = {
    world: worldTypes.World
}

export const DrawMap: React.SFC<OwnProps> = (  { world } ) => {
    const TILE_SIZE = 100;

    const board = _.times(world.width, _.constant(_.times(world.length, _.constant(null))));

    const TILE_WIDTH_HALF = TILE_SIZE/2;
    const TILE_HEIGHT_HALF = (TILE_SIZE/4) + (TILE_SIZE * 0.04); //The 0.04 is to offset the ground having a thickness

    const TILE_HEIGHT = TILE_SIZE*4;

    return (
        <svg className="map" width="100%" height="800" viewBox={`${-TILE_SIZE*10/2} ${TILE_HEIGHT} ${TILE_SIZE*10} ${TILE_SIZE*10}`} preserveAspectRatio="xMidYMid">
        { board.map( (row, x) => (
            row.map( (col, y) => {
                const definition = world.structures[Math.floor(Math.random() * 4)].definition;
                const ratio =  TILE_SIZE/definition.imageWidth;

                const definitionImage = definition.image;
                console.log(definitionImage)

                return (<svg className="tile"
                    key={x*1000 + y}
                    x={ x * TILE_WIDTH_HALF - y * TILE_WIDTH_HALF }
                    y={ (x * TILE_HEIGHT_HALF + y * TILE_HEIGHT_HALF)}
                    width={TILE_SIZE} height={TILE_HEIGHT}
                    viewBox={`0 0 ${TILE_SIZE} ${TILE_HEIGHT}`}
                >

                    <image
                        y={TILE_HEIGHT - (definition.imageHeight * ratio)}
                        xlinkHref={`${definition.imageUrl}`}
                        width={ TILE_SIZE }
                    />


                 </svg>)
            })
        )) }
        </svg>
    )
};

export default DrawMap;
// <svg>{renderHTML(definitionImage.innerHTML)}</svg>

//http://jsiso.com/tutorials/2014/10/26/isometric-engine-basics.html
//http://clintbellanger.net/articles/isometric_math/
