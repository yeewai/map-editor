import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldSelectors, worldTypes } from 'services/worlds';

import DrawMap from './DrawMap';
import CameraControls from './CameraControls';

export type StateProps  = {
    world: worldTypes.World | undefined
}

export const mapStateToProps = (state: StateTree, ownProps): StateProps => ({
    world: worldSelectors.getWorldById(state, ownProps.match.params.id)
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

    let board = _.times(30, _.constant(_.times(30, _.constant(null))));
    board = board.map( (row, x) => (
                row.map( (col, y) =>
                    world.structures[Math.floor(Math.random() * 4)].definition
                )
            )
        );

    return (
        <article>
            <h2>{world.name}</h2>
            <CameraControls />
            <DrawMap world={world} board={board} />
        </article>
    )

};

export default connect<StateProps, any, any>(mapStateToProps)(MapEditor);
