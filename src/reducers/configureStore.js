import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger'


export const configureStore = () => {
    const storeWithMiddlewares = applyMiddleware(
        thunk,
        promise,
        createLogger(),
    );

    const middleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    );
  return createStore(reducers, storeWithMiddlewares);
};