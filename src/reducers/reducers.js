import { combineReducers } from 'redux';
import user from './user.js';
import ranking from './ranking.js';
import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import App from '../components/App';

const navReducer = createNavigationReducer(App);
const reducers = combineReducers({
  nav: navReducer,
  ranking, 
  user
});
export default reducers;