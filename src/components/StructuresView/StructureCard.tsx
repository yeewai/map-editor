import * as React from 'react';
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

import { OpenModalButton } from '@evercourse/ever-modal';
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';

export interface StateProps {
    structureDefinition: structureDefinitionTypes.StructureDefinition
}

export const StructureCard: React.SFC<StateProps> = ( { structureDefinition } ) => {
    return (
        <li className="card-li">
            <Card>
                <CardImg top width="100%" src={structureDefinition.imageUrl} alt={structureDefinition.name} />
                <CardBody>
                    <CardTitle>{structureDefinition.name}</CardTitle>
                    <CardSubtitle>{structureDefinition.width} x {structureDefinition.length}</CardSubtitle>
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: structureDefinition.description}} />
                    <OpenModalButton
                        modalType="EDIT_STRUCTURE_DEFINITION"
                        modalProps={{ariaLabel: "Edit Structure Definition", structureDefinition: structureDefinition, formName: "structureDefinition"}}
                    >
                        Edit
                    </OpenModalButton>
                </CardBody>
            </Card>
        </li>
    );
}

export default StructureCard;
