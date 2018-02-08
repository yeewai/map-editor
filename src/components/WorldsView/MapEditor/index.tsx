import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldSelectors, worldTypes } from 'services/worlds';

import DrawMap from './DrawMap';

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


    return (
        <article>
            <h2>{world.name}</h2>
            <DrawMap world={world} />
        </article>
    )

};

export default connect<StateProps, any, any>(mapStateToProps)(MapEditor);
