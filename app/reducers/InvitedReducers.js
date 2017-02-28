"use strict";
import { ADD_PERSON_ITEM, REMOVE_PERSON_ITEM, PERSON_ITEMS_LOADED } from "../actions/InvitedActions"


var Immutable = require('immutable');
const NEW_PERSON_ITEM = { name : "", attended : false, avatarType : "", avatarText : ""};

export function invited(state = { lastid : 0, items : {} }, action)
{
    switch(action.type)
    {
        case ADD_PERSON_ITEM:
            console.log("#agenda -> ADD_PERSON_ITEM");

            let oldItems = Immutable.Map(state.items);
            let newId = state.lastid + 1;
            
            return Immutable.Map({
                lastid : newId,
                items : oldItems.set(newId, NEW_PERSON_ITEM).toObject()
            }).toObject();

        case REMOVE_PERSON_ITEM:
            console.log("#agenda -> REMOVE_PERSON_ITEM");

            return Immutable.Map({
                lastid : state.lastid,
                items : Immutable.Map(state.items).delete(action.id).toObject()
            }).toObject();

        case PERSON_ITEMS_LOADED:
            return Immutable.Map({
                lastId: 0,
                items : _.keyBy(action.items, "_id")
            }).toObject();
        default:
            return state;
    }
}