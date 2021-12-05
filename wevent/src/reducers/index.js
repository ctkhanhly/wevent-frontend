import { combineReducers } from 'redux';
import {event} from './event.reducer';
import {plan} from './plan.reducer';

export default combineReducers({
    event,
    plan
})