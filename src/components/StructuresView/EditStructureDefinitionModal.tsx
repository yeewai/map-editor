import React from 'react';
import { connect } from 'react-redux';
import Modal from '@evercourse/ever-modal';

import StructureDefinitionForm from './StructureDefinitionForm';

import { structureDefinitionsActions, structureDefinitionTypes } from 'services/structureDefinitions';
import { StateTree } from 'services/types';


export const mapDispatchToProps = ( dispatch ) => ({
    handleFormSubmit: ( values: any ) => ( dispatch(structureDefinitionsActions.updateStructureDefinition(values)) )
});

export interface StateProps {
    modalType: string,
    handleFormSubmit: ( values: any ) => any,
    sd: structureDefinitionTypes.StructureDefinition
}
export const ModalContent: React.SFC<StateProps> = ({modalType, handleFormSubmit, sd}) => {
    return (
        <Modal modalType={modalType} contentLabel="Modal" className="modal-md" >
            <div className="modal-header">
                <h5 className="modal-title">Edit Structure Definition</h5>
            </div>
            <div className="modal-body">
                <StructureDefinitionForm
                    handleFormSubmit={handleFormSubmit}
                    sd={sd}
                    formName="structureDefinition" />
            </div>
        </Modal>
    );
};

export default connect<undefined, any, any>(undefined, mapDispatchToProps)(ModalContent);
