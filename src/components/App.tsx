import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import StructuresView from './StructuresView';
import WorldsView from './WorldsView';

import { ModalRoot, ConfirmModal } from 'ever-modal';
import EditStructureDefinitionModal from './StructuresView/EditStructureDefinitionModal';
import AddStructureDefinitionModal from './StructuresView/AddStructureDefinitionModal';

class App extends React.Component {
    render() {
        const modal_components = {

            'ADD_STRUCTURE_DEFINITION': AddStructureDefinitionModal,
            'EDIT_STRUCTURE_DEFINITION': EditStructureDefinitionModal
        };

        return (
            <div className="App">
                <Switch>
                    <Route path="/structures" component={StructuresView} />
                    <Route path="/worlds" component={WorldsView} />
                </Switch>

                <ModalRoot modal_components={modal_components}/>
                <ModalRoot modal_components={{'CONFIRM_MODAL': ConfirmModal}}/>
            </div>
        );
    }
}

export default App;
