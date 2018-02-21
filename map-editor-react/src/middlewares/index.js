// import ravenMiddleware from './raven.js';
import { compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


/**
 * buildMiddlewares - description
 *
 * @param  {type} history description 
 * @return {type}         description
 */
export default function buildMiddlewares (history) {
    switch (process.env.NODE_ENV) {
        case 'development':
            return compose(
                applyMiddleware(
                    routerMiddleware(history),
                    thunkMiddleware,
                    createLogger({ collapsed: true }),
                    // ravenMiddleware
                ),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            );
        case 'production':
            return compose(applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                // ravenMiddleware
            ));
        case 'test':
            // no middleware needed since we mock a redux store in tests
            return compose(applyMiddleware());
        default:
            return compose(applyMiddleware());
    }
}
