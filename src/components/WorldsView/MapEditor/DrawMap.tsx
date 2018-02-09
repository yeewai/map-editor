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

    const board = _.times(10, _.constant(_.times(10, _.constant(null))));

    const TILE_WIDTH_HALF = TILE_SIZE/2;
    const TILE_HEIGHT_HALF = (TILE_SIZE/4) + (TILE_SIZE * 0.04); //The 0.04 is to offset the ground having a thickness

    const TILE_HEIGHT = TILE_SIZE*4;
    return (
        <section>

            <svg className="map" width="100%" height="800" viewBox={`${-TILE_SIZE*10/2} ${TILE_HEIGHT*1.5} ${TILE_SIZE*10} ${TILE_SIZE*10}`} preserveAspectRatio="xMidYMid">
            <defs className="structureReference">
            { world.structures.map( s => (
                <svg id={s.definition.id} key={s.definition.id}
                width={ TILE_SIZE }
                viewBox={`0 0 ${s.definition.imageWidth} ${s.definition.imageHeight}`}
                dangerouslySetInnerHTML={{__html: s.definition.image.innerHTML}}
                fill="currentcolor"
                />
            ))}
            </defs>
            { board.map( (row, x) => (
                row.map( (col, y) => {
                    const definition = world.structures[Math.floor(Math.random() * 4)].definition;
                    const ratio =  TILE_SIZE/definition.imageWidth;

                    return (

                        <use className="tile"
                            key={x*1000 + y}
                            x={ x * TILE_WIDTH_HALF - y * TILE_WIDTH_HALF }
                            y={ (x * TILE_HEIGHT_HALF + y * TILE_HEIGHT_HALF) + ((TILE_HEIGHT - (definition.imageHeight * ratio))/2) }
                            xlinkHref={`#${definition.id}`}
                            fill="yellow"
                        />

)
                })
            )) }
            </svg>
        </section>
    )
};

export default DrawMap;
// <svg>{renderHTML(definitionImage.innerHTML)}</svg>

//http://jsiso.com/tutorials/2014/10/26/isometric-engine-basics.html
//http://clintbellanger.net/articles/isometric_math/
