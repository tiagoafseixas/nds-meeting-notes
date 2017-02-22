import { combineReducers } from 'redux';
import { ADD_MINUTE, UPDATE_CURRENT_MINUTE_TITLE } from './actions';


function minutes(state = {}, action)
{
    switch (action.type)
    {
        case ADD_MINUTE:
            console.log("#minutes -> ADD_MINUTE")
            let newMinute = {
                title : "Meeting Title",
                date : new Date(),
                time : null,
                conclusions : "",
                minute : "",
                agenda : [],
                invited : [],
                attended : []
            };
            return Object.assign({}, state, { "current" : newMinute });
        case UPDATE_CURRENT_MINUTE_TITLE:
            console.log("#currentMinute -> UPDATE_CURRENT_MINUTE_TITLE");
            let title = action.title;
            return Object.assign({}, state, { "current" : { title} });
        default:
            return state;
    }
}

function currentMinute(state = {}, action)
{
    switch (action.type)
    {
        default:
            return state;
    }
}

const MEETINGS_APP = combineReducers({ minutes, currentMinute });

export default MEETINGS_APP;