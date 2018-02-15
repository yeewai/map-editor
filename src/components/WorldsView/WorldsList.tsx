import * as React from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import { Link, RouteComponentProps } from 'react-router-dom';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';

import _ from 'lodash';
import { worldSelectors, worldTypes } from 'services/worlds';

export interface MapProps {
    worlds: worldTypes.World[]
}
export const mapStateToProps = (state: StateTree) => ({
    worlds: worldSelectors.getUniqueWorlds(state)
});

interface OwnProps extends RouteComponentProps<any>, React.Props<any> {};

export type StateProps = MapProps & OwnProps;


export const WorldsList: React.SFC<StateProps> = (  { worlds, match } ) => (
    <ListGroup>
        <ListGroupItem key="title">
            <h2>Worlds</h2>
            <OpenModalButton modalType="ADD_WORLD" modalProps={{ariaLabel: "Sup", formName: "world"}} >New</OpenModalButton>
        </ListGroupItem>
        <ListGroupItem key="worlds">
        <ListGroup className="list-group-flush">
            { worlds.map( ( world: worldTypes.World ) => {
                const createdAtStr = moment(world.createdAt).format("lll");
                return (
                    <Link to={`${match.url}/${world.key}`} key={world.id} className="list-group-item list-group-item-action">
                        <h3>{world.name}</h3>
                        <time className="start-date" dateTime={createdAtStr}> { createdAtStr }</time>
                        <div dangerouslySetInnerHTML={{__html: world.description || ""}}/>
                    </Link>
                );
            } ) }
        </ListGroup>

        </ListGroupItem>
    </ListGroup>
);



export default connect<MapProps, any, any>(mapStateToProps)(WorldsList);
