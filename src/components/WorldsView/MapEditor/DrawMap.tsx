import * as React from 'react';
import { connect } from "react-redux";

import { TILE_SIZE, INITIAL_ZOOM } from 'conf';
import { OpenModalButton } from '@evercourse/ever-modal';

import { DrawBoard } from './DrawBoard';

import { StateTree } from 'services/types';
import { worldTypes } from 'services/worlds';
import { mapEditorSelectors } from 'services/mapEditor';

interface OwnProps {
    world: worldTypes.WorldWithBoard
}

interface StateProps {
    zoom: number,
    pan: {
        v: number,
        h: number
    }
}

export const mapStateToProps = (state: StateTree, ownProps: OwnProps): StateProps => ({
    zoom: mapEditorSelectors.getZoom(state),
    pan: mapEditorSelectors.getPan(state)
});

export type PropTypes = OwnProps & StateProps;

export const DrawMap: React.SFC<PropTypes> = ( { world, zoom, pan} ) => {
    const viewBox = [
        (pan.h * TILE_SIZE) + (-TILE_SIZE * 30/4),
        (pan.v * TILE_SIZE) + ( TILE_SIZE * 30/2 ) ,
        (TILE_SIZE*INITIAL_ZOOM)/zoom,
        TILE_SIZE*INITIAL_ZOOM/zoom
    ].join(" ");

    return (
        <section>

            <svg className="map" width="100%" height="800" viewBox= {viewBox} preserveAspectRatio="xMidYMid">
            <defs className="structureReference">
            { world.uniqueStructures.map( definition => (
                <symbol id={definition.id} key={definition.id}
                    viewBox={`0 0 ${definition.imageWidth} ${definition.imageHeight}`}
                    dangerouslySetInnerHTML={{__html: definition.image.innerHTML}}
                />
            )) }
            </defs>

            { <DrawBoard board={world.board} />}
            </svg>
        </section>
    )
};

export default connect<StateProps, any, any>(mapStateToProps)(DrawMap);

// -------- Helpful resources ---------------------------------------------
//http://jsiso.com/tutorials/2014/10/26/isometric-engine-basics.html
//http://clintbellanger.net/articles/isometric_math/
