import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Route } from 'react-router-dom';
import store, { history } from './store';

const componentToRender = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

const renderTarget = document.getElementById('root');

render(componentToRender, renderTarget);

registerServiceWorker();
