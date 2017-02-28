"use strict";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import { 
    ADD_MINUTE, UPDATE_CURRENT_MINUTE_TITLE,
    GET_MINUTE, SET_MINUTE, SAVE_MINUTE, LOAD_MINUTES, minuteItemsIsLoading,
    minuteItemsLoaded, minuteItemsLoadError, MINUTE_ITEMS_IS_LOADING,
    MINUTE_ITEMS_LOAD_ERROR, MINUTE_ITEMS_LOADED
} from '../actions/MinutesActions';

var $ = require('jQuery');
var Immutable = require('immutable');

const API_URL = 'http://localhost:8080/api/';

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
    draft: true,
    id: id
}};

const NEW_MINUTE_ID = "NEW";
export function minutes(state = { items : {}, current: null, loading : false}, action)
{
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
            console.log("#minutes -> ADD_MINUTE");
            return Immutable.Map({
                items : Immutable.Map(state.items).set(
                    NEW_MINUTE_ID, NEW_MINUTE_ITEM(NEW_MINUTE_ID)
                ).toObject(),
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
            console.log("#minutes -> UPDATE_CURRENT_MINUTE_TITLE");
            var oldItems = Immutable.Map(state.items).toObject();
            oldItems[action.id].title = action.title;
            return Immutable.Map({
                items : oldItems,
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
            console.log("#minutes -> SET_MINUTE");
            return Immutable.Map(state).set("current", action.id).toObject();
        case SAVE_MINUTE:
            /**
             * =================================================================
             * SAVE_MINUTE - Makes the API call to the backend to save the
             *               current minute in the database.
             * 
             *               @todo: After receiving the response it should
             *               update the current meeting id and the draft field
             *               value to false.
             * =================================================================
             */
            console.log("#minutes -> SAVE_MINUTE");
            $.post({
                url : API_URL + 'minutes/',
                data : $("#meetingDetailForm").serialize(),
                success : (data) => { console.log(data); },
                dataType : "json",
                contentType: "application/x-www-form-urlencoded"
            });
            return state;
        case MINUTE_ITEMS_IS_LOADING:
            console.log("#minutes -> MINUTE_ITEMS_IS_LOADING");
            return Immutable.Map(state).set("loading", action.isLoading).toObject();
        case MINUTE_ITEMS_LOAD_ERROR:
            console.log("#minutes -> MINUTE_ITEMS_LOAD_ERROR");
            return state;
        case MINUTE_ITEMS_LOADED:
            console.log("#minutes -> MINUTE_ITEMS_LOADED");
            let items = action.items;
            console.log(items);
            try {
                let itemsObj = {};
                items.map( (minute) => { itemsObj[minute._id] = minute ;});
                return Immutable.Map(state).set("items", itemsObj).toObject();
            } catch (e) {
                console.log(e);
            }
        default:
            return state;
    }
}

export function loadMinutesThunk()
{
    console.log("here 1");
    return (dispatch) => {
        dispatch(minuteItemsIsLoading(true));
        console.log("here 2");
        fetch(API_URL + 'minutes/')
            .then( (response) => {
                console.log("received response");
                console.log(response);
                dispatch(minuteItemsIsLoading(false));
                return response;
            })
            .then( (response) => response.json() )
            .then( ({items}) => dispatch(minuteItemsLoaded(items)))
            .catch( () => dispatch(minuteItemsLoadError()));
    };
}
