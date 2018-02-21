import * as React from 'react';
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

import { StateTree } from 'services/types';
import { OpenModalButton } from '@evercourse/ever-modal';
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';
import { mapEditorActions, mapEditorSelectors } from 'services/mapEditor';

export interface OwnProps {
    structureDefinition: structureDefinitionTypes.StructureDefinition
}

export interface StateProps {
    isActive: boolean
}

export const mapStateToProps = (state: StateTree, ownProps): StateProps => ({
    isActive: mapEditorSelectors.getBuildStructureDefinition(state) === ownProps.structureDefinition
});

export interface DispatchProps {
    setBuildStructureDefinition: ( sd: structureDefinitionTypes.StructureDefinition ) => void
}

export const mapDispatchToProps = (dispatch: any) => ({
    setBuildStructureDefinition: ( sd ) => { dispatch(mapEditorActions.setStructureDefinition(sd)) }
})

export type Props = OwnProps & DispatchProps & StateProps;

export const StructureCard: React.SFC<Props> = ( { isActive, structureDefinition, setBuildStructureDefinition } ) => {
    return (
        <li className={`card-li ${isActive ? 'active' : null }`}> <button className="structure-btn" onClick={() => setBuildStructureDefinition(structureDefinition)}>
            <Card>
                <CardImg top width="100%" src={structureDefinition.imageUrl} alt={structureDefinition.name} />
                <CardBody>
                    <CardTitle>{structureDefinition.name}</CardTitle>
                    <CardSubtitle>{structureDefinition.width} x {structureDefinition.length}</CardSubtitle>
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: structureDefinition.description || "" }} />
                </CardBody>
            </Card>
        </button></li>
    );
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(StructureCard);
