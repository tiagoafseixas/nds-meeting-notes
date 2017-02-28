import { ADD_AGENDA_ITEM, REMOVE_AGENDA_ITEM, AGENDA_ITEMS_LOADED } from "../actions/AgendaActions"

var _ = require('lodash');
var Immutable = require('immutable');
const NEW_AGENDA_ITEM = { descriptions : "", completed : false, important : false };

export function agenda(state = { lastid : 0, items : {} }, action)
{
    switch(action.type)
    {
        case ADD_AGENDA_ITEM:
            console.log("#agenda -> ADD_AGENDA_ITEM");

            let oldItems = Immutable.Map(state.items);
            let newId = state.lastid + 1;
            
            return Immutable.Map({
                lastid : newId,
                items : oldItems.set(newId, NEW_AGENDA_ITEM).toObject()
            }).toObject();

        case REMOVE_AGENDA_ITEM:
            console.log("#agenda -> REMOVE_AGENDA_ITEM");

            return Immutable.Map({
                lastid : state.lastid,
                items : Immutable.Map(state.items).delete(action.id).toObject()
            }).toObject();

        case AGENDA_ITEMS_LOADED:
            return Immutable.Map({
                lastId: 0,
                items : _.keyBy(action.items, "_id")
            }).toObject();
        default:
            return state;
    }
}