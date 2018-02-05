import React from 'react';
import { connect } from 'react-redux';
import Modal from 'ever-modal';

import StructureDefinitionForm from './StructureDefinitionForm';

import { structureDefinitionsActions, structureDefinitionTypes } from 'services/structureDefinitions';
import { StateTree } from 'services/types';


export const mapDispatchToProps = ( dispatch ) => ({
    handleFormSubmit: ( values: any ) => ( dispatch(structureDefinitionsActions.addStructureDefinition(values)) )
});

export interface StateProps {
    modalType: string,
    handleFormSubmit: ( values: any ) => any
}
export const ModalContent: React.SFC<StateProps> = ({modalType, handleFormSubmit}) => {
    return (
        <Modal modalType={modalType} contentLabel="Modal" className="modal-md" >
            <div className="modal-header">
                <h5 className="modal-title">Add New Structure Definition</h5>
            </div>
            <div className="modal-body">
                <StructureDefinitionForm
                    handleFormSubmit={handleFormSubmit}
                    formName="structureDefinition" />
            </div>
        </Modal>
    );
};

export default connect<undefined, any, any>(undefined, mapDispatchToProps)(ModalContent);
