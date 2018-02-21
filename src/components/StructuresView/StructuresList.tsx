import * as React from 'react';
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button,
     ListGroup, ListGroupItem } from 'reactstrap';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';

import _ from 'lodash';
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';


export interface StateProps {
    structureDefinitions: _.Dictionary<structureDefinitionTypes.StructureDefinition[]>
}
export const mapStateToProps = (state: StateTree) => ({
    structureDefinitions: structureDefinitionsSelectors.getByGroup(state)
});

interface OwnProps { LiComponent: React.SFC<any> }

type Props = StateProps & OwnProps;

export const StructuresList: React.SFC<Props> = ( { structureDefinitions, LiComponent } ) => {
    return (
        <ListGroup className="structure-library">
            <ListGroupItem key="title">
                <h2>Structure Library</h2>
                <OpenModalButton modalType="ADD_STRUCTURE_DEFINITION" modalProps={{ariaLabel: "Sup", formName: "structureDefinition"}} >New</OpenModalButton>
            </ListGroupItem>
            {
                Object.keys(structureDefinitions).map( (key) => (
                    <ListGroupItem key={key}>
                        <h3>{key}</h3>
                        <ul>
                            { structureDefinitions[key].map( ( sd: structureDefinitionTypes.StructureDefinition ) => (
                                <LiComponent structureDefinition={ sd } key={sd.id} />
                            )) }
                        </ul>
                    </ListGroupItem>
                ))
            }
        </ListGroup>
    );
}


export default connect<StateProps, any, any>(mapStateToProps)(StructuresList);
