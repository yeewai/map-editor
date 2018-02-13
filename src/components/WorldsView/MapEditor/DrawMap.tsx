import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { OpenModalButton } from '@evercourse/ever-modal';

import { DrawBoard } from './DrawBoard';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';

interface OwnProps {
    world: worldTypes.World,
    board: any
}

interface StateProps {
    zoom: number,
    panV: number,
    panH: number
}

export const mapStateToProps = (state: StateTree, ownProps: OwnProps): StateProps => ({
    zoom: state.mapEditor.zoom,
    panV: state.mapEditor.panV,
    panH: state.mapEditor.panH
});

export type PropTypes = OwnProps & StateProps;

export const DrawMap: React.SFC<PropTypes> = ( { world, zoom, board , panH, panV} ) => {
    const TILE_SIZE = 10;
    const INITIAL_ZOOM = 10;
    const TILE_HEIGHT = TILE_SIZE*4;

    const viewBox = [
        (panH * TILE_SIZE) + (-TILE_SIZE * 30/4),
        (panV * TILE_SIZE) + ( TILE_SIZE * 30/2 ) ,
        (TILE_SIZE*INITIAL_ZOOM)/zoom,
        TILE_SIZE*INITIAL_ZOOM/zoom
    ].join(" ");

    return (
        <section>

            <svg className="map" width="100%" height="800" viewBox= {viewBox} preserveAspectRatio="xMidYMid">
            <defs className="structureReference">
            { world.structures.map( s => (
                <symbol id={s.definition.id} key={s.definition.id}

                viewBox={`0 0 ${s.definition.imageWidth} ${s.definition.imageHeight}`}
                dangerouslySetInnerHTML={{__html: s.definition.image.innerHTML}}
                />
            )) /**/}
            </defs>

            { <DrawBoard board={board} TILE_SIZE={TILE_SIZE} TILE_HEIGHT={TILE_HEIGHT} />}
            </svg>
        </section>
    )
};

export default connect<StateProps, any, any>(mapStateToProps)(DrawMap);
// <svg>{renderHTML(definitionImage.innerHTML)}</svg>

//http://jsiso.com/tutorials/2014/10/26/isometric-engine-basics.html
//http://clintbellanger.net/articles/isometric_math/
