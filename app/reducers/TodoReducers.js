"use strict";

import { ADD_TODO_ITEM, REMOVE_TODO_ITEM } from "../actions/TodoActions"


var Immutable = require('immutable');
const NEW_TODO_ITEM = { description : "", completed : false};

export function todos(state = { lastid : 0, items : {} }, action)
{
    switch(action.type)
    {
        case ADD_TODO_ITEM:
            console.log("#todos -> ADD_TODO_ITEM");

            let oldItems = Immutable.Map(state.items);
            let newId = state.lastid + 1;
            
            return Immutable.Map({
                lastid : newId,
                items : oldItems.set(newId, NEW_TODO_ITEM).toObject()
            }).toObject();

        case REMOVE_TODO_ITEM:
            console.log("#todos -> REMOVE_PERSON_ITEM");

            return Immutable.Map({
                lastid : state.lastid,
                items : Immutable.Map(state.items).delete(action.id).toObject()
            }).toObject();
        default:
            return state;
    }
}