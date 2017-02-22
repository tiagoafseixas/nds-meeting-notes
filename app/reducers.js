import { combineReducers } from 'redux';
import { ADD_MINUTE } from './actions';

function minutes(state = [], action)
{
    switch (action.type)
    {
        case ADD_MINUTE:
            console.log("#minutes -> ADD_MINUTE")
            return [...state, {_id: 1, title: "Meeting Title"}];
        default:
            return state;
    }
}

const MEETINGS_APP = combineReducers({ minutes });

export default MEETINGS_APP;