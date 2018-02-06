import * as React from 'react';
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button,
     ListGroup, ListGroupItem } from 'reactstrap';

import { OpenModalButton } from 'ever-modal';

import { StateTree } from 'services/types';

import _ from 'lodash';
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';

export interface StateProps {
    structureDefinitions: _.Dictionary<structureDefinitionTypes.StructureDefinition[]>
}

export const StructuresList: React.SFC<StateProps> = ( props ) => {
    const { structureDefinitions } = props;

    return (
        <ListGroup>
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
                                <li className="card-li" key={sd.id} >
                                    <Card>
                                        <CardImg top width="100%" src={sd.imageUrl} alt={sd.name} />
                                        <CardBody>
                                            <CardTitle>{sd.name}</CardTitle>
                                            <CardSubtitle>{sd.width} x {sd.length}</CardSubtitle>
                                            <div className="card-text" dangerouslySetInnerHTML={{ __html: sd.description || "" }} />
                                            <OpenModalButton modalType="EDIT_STRUCTURE_DEFINITION" modalProps={{ariaLabel: "Sup", sd: sd, formName: "structureDefinition"}} >Edit</OpenModalButton>
                                        </CardBody>
                                    </Card>
                                </li>
                            )) }
                        </ul>
                    </ListGroupItem>
                ))
            }
        </ListGroup>
    );
}

export const mapStateToProps = (state: StateTree) => ({
    structureDefinitions: structureDefinitionsSelectors.getByGroup(state)
});


export default connect<StateProps, any, any>(mapStateToProps)(StructuresList);
