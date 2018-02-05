import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import StructuresView from './StructuresView';

import { ModalRoot, confirmModal } from 'ever-modal';
import EditStructureDefinitionModal from './StructuresView/EditStructureDefinitionModal';
import AddStructureDefinitionModal from './StructuresView/AddStructureDefinitionModal';

class App extends React.Component {
    render() {
        const modal_components = {
            'CONFIRM_MODAL': confirmModal,
            'ADD_STRUCTURE_DEFINITION': AddStructureDefinitionModal,
            'EDIT_STRUCTURE_DEFINITION': EditStructureDefinitionModal
        };

        return (
            <div className="App">
                <ModalRoot modal_components={modal_components}/>

                <Switch>
                    <Route path="/structures" component={StructuresView} />
                </Switch>
            </div>
        );
    }
}

export default App;
