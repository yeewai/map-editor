import * as React from 'react';
import { connect } from "react-redux";
import { Alert } from 'reactstrap';
// import moment from 'moment';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldSelectors, worldTypes } from 'services/worlds';

import DrawMap from './DrawMap';
import CameraControls from './CameraControls';

export type StateProps  = {
    world: worldTypes.WorldWithBoard | undefined
}

export const mapStateToProps = (state: StateTree, ownProps): StateProps => ({
    world: worldSelectors.getWorldWithBoardByKey(state, ownProps.match.params.id)
});

export const MapEditor: React.SFC<StateProps> = (  { world } ) => {
    if (!world) {
        return (
            <Alert color="danger">
                <h2>Error!</h2>
                <p>That world does not exist!</p>
            </Alert>
        );
    }

    return (
        <article>
            <h2>{world.name}</h2>
            <CameraControls />
            <DrawMap world={world}/>
        </article>
    )

};

export default connect<StateProps, any, any>(mapStateToProps)(MapEditor);
