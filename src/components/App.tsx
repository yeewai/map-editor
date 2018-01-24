import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import StructuresView from './StructuresView';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/structures" component={StructuresView} />
                </Switch>
            </div>
        );
    }
}

export default App;
