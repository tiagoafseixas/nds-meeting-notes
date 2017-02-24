"use strict";

import { ADD_MINUTE, UPDATE_CURRENT_MINUTE_TITLE, GET_MINUTE, SET_MINUTE } from '../actions/MinutesActions';

var Immutable = require('immutable');
const NEW_MINUTE_ITEM = (id) => { return {
    title : "",
    date : new Date(),
    time : null,
    conclusions : "",
    minute : "",
    agenda : {},
    invited : {},
    attended : {},
    changed : true,
    id: id
}};

export function minutes(state = { items : {}, current: null}, action)
{
    switch (action.type)
    {
        case ADD_MINUTE:
            console.log("#minutes -> ADD_MINUTE")
            var oldItems = Immutable.Map(state.items);
            var newMinuteId = "NEW";

            return Immutable.Map({
                items : oldItems.set(newMinuteId, NEW_MINUTE_ITEM(newMinuteId)).toObject(),
                current : newMinuteId
            }).toObject();

        case UPDATE_CURRENT_MINUTE_TITLE:
            console.log("#minutes -> UPDATE_CURRENT_MINUTE_TITLE");
            console.log(action.id);
            console.log(action.title);
            var title = action.title;
            var oldItems = Immutable.Map(state.items).toObject();
            oldItems[action.id].title = title;

            console.log(Immutable.Map({
                items : oldItems,
                current : state.current
            }).toObject());

            return Immutable.Map({
                items : oldItems,
                current : state.current
            }).toObject();

        case SET_MINUTE:
            console.log("#minutes -> SET_MINUTE");  
            console.log(action.id);

            var oldState = Immutable.Map(state);
            var newState = oldState.set("current", action.id);
            return newState.toObject();
        default:
            return state;
    }
}
