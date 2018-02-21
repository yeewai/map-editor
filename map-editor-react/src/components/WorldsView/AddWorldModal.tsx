import React from 'react';
import { connect } from 'react-redux';
import Modal from '@evercourse/ever-modal';

import WorldForm from './WorldForm';

import { worldActions, worldTypes } from 'services/worlds';
import { StateTree } from 'services/types';


export const mapDispatchToProps = ( dispatch ) => ({
    handleFormSubmit: ( values: any ) => ( dispatch(worldActions.addWorld(values)) )
});

export interface StateProps {
    modalType: string,
    handleFormSubmit: ( values: any ) => any
}
export const ModalContent: React.SFC<StateProps> = ({modalType, handleFormSubmit}) => {
    return (
        <Modal modalType={modalType} contentLabel="Modal" className="modal-md" >
            <div className="modal-header">
                <h5 className="modal-title">Add New World</h5>
            </div>
            <div className="modal-body">
                <WorldForm
                    handleFormSubmit={handleFormSubmit}
                    formName="world" />
            </div>
        </Modal>
    );
};

export default connect<undefined, any, any>(undefined, mapDispatchToProps)(ModalContent);
