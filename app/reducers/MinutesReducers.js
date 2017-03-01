"use strict";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Minute Action Ids
import { ADD_MINUTE, UPDATE_CURRENT_MINUTE_TITLE, SET_MINUTE } from '../actions/MinutesActions';
import { MINUTE_ITEMS_LOAD_ERROR, MINUTE_ITEMS_LOADED, MINUTE_ITEMS_IS_LOADING } from '../actions/MinutesActions';
import { MINUTE_ADD_ERROR, MINUTE_ADDED, MINUTE_ADDING } from '../actions/MinutesActions';

var Immutable = require('immutable');

/**
 * =============================================================================
 * CONSTANTS
 * =============================================================================
 */
const DEFAULT_MINUTE_STATE =
{
    items   : {},
    current : null,
    loading : false,
    adding  : false
};

const NEW_MINUTE_ITEM = (id) => { return {
    title : "",
    date : new Date(),
    time : null,
    conclusions : "",
    minute : "",
    agenda : { lastid: 0, items : {}},
    invited : { lastid: 0, items : {}},
    todos : { lastid: 0, items : {}},
    changed : true,
    draft: true,
    id: id
}};

const NEW_MINUTE_ID = "NEW";

/**
 * =============================================================================
 * REDUCERS
 * =============================================================================
 */
export function minutes(state = DEFAULT_MINUTE_STATE, action)
{
    console.log("#minutes -> " + action.type);
    switch (action.type)
    {
        case ADD_MINUTE:
            /**
             * =================================================================
             * ADD_MINUTE - Loads the insert minute form and adds a new entry
             *              to the items list as a draft.
             * 
             *              Only one draft can exist at a time. Maybe change
             *              this in the future?
             * =================================================================
             */
            var items = Immutable.Map(state.items);
            return Immutable.Map({
                items : items.set(NEW_MINUTE_ID, NEW_MINUTE_ITEM(NEW_MINUTE_ID)).toObject(),
                current : NEW_MINUTE_ID
            }).toObject();
        case UPDATE_CURRENT_MINUTE_TITLE:
            /**
             * =================================================================
             * UPDATE_CURRENT_MINUTE_TITLE - Updates the current minute title in
             *                               the left menu.
             * 
             * Keyword Arguments:
             *    title - the title of the current meeting minute.
             *    items - the list of currently loaded minute items.
             * =================================================================
             */
            var items = Immutable.Map(state.items).toObject();
            items[action.id].title = action.title;
            return Immutable.Map({
                items,
                current : state.current
            }).toObject();
        case SET_MINUTE:
            /**
             * =================================================================
             * SET_MINUTE - Changes the current minute being edited.
             * 
             * Keyword Arguments:
             *     id - the id of the action being edited.
             * =================================================================
             */
            return Immutable.Map(state).set("current", action.id).toObject();
        case MINUTE_ITEMS_IS_LOADING:
            return Immutable.Map(state).set("loading", action.isLoading).toObject();
        case MINUTE_ITEMS_LOAD_ERROR:
            return state;
        case MINUTE_ITEMS_LOADED:
            return Immutable.Map(state).set("items", _.keyBy(action.items, "_id")).toObject();
        case MINUTE_ADDING:
            return Immutable.Map(state).set("adding", action.bool).toObject();
        case MINUTE_ADDED:
            return state;
        case MINUTE_ADD_ERROR:
            return state;
        default:
            return state;
    }
}
