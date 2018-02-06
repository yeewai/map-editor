import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import { OpenModalButton } from 'ever-modal';

import { StateTree } from 'services/types';

import _ from 'lodash';
import { worldSelectors, worldTypes } from 'services/worlds';

export interface StateProps {
    worlds: worldTypes.World[]
}

export const WorldsList: React.SFC<StateProps> = (  { worlds } ) => (
    <ListGroup>
        <ListGroupItem key="title">
            <h2>Worlds</h2>
            <OpenModalButton modalType="ADD_WORLD" modalProps={{ariaLabel: "Sup", formName: "world"}} >New</OpenModalButton>
        </ListGroupItem>
        <ListGroupItem key="worlds">
        <ListGroup className="list-group-flush">
            { worlds.map( ( world: worldTypes.World ) => {
                const createdAtStr = moment(world.createdAt).format("lll");
                return (<ListGroupItem key={world.id} tag="a" href="#/worlds" action>
                    <h3>{world.name}</h3>
                    <time className="start-date" dateTime={createdAtStr}> { createdAtStr }</time>
                    <div dangerouslySetInnerHTML={{__html: world.description || ""}}/>
                </ListGroupItem>);
            } ) }
        </ListGroup>

        </ListGroupItem>
    </ListGroup>
);

export const mapStateToProps = (state: StateTree) => ({
    worlds: worldSelectors.getUniqueWorlds(state)
});


export default connect<StateProps, any, any>(mapStateToProps)(WorldsList);
