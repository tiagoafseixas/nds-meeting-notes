"use strict";

var $ = require('jQuery');

import { agendaItemsLoaded } from './AgendaActions'
import { personItemsLoaded } from './InvitedActions'
import { todoItemsLoaded } from './TodoActions'

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_MINUTE = "ADD_MINUTE";
export const GET_MINUTE = "GET_MINUTE";
export const ARCHIVE_MINUTE = "ARCHIVE_MINUTE";
export const SAVE_MINUTE = "SAVE_MINUTE";
export const UPDATE_CURRENT_MINUTE_TITLE = "UPDATE_CURRENT_MINUTE_TITLE";
export const SET_MINUTE = "SET_MINUTE";

export const MINUTE_ADDING = "MINUTE_ADDING";
export const MINUTE_ADDED = "MINUTE_ADDED";
export const MINUTE_ADD_ERROR = "MINUTE_ADD_ERROR";

export const MINUTE_ITEMS_IS_LOADING = "MINUTE_ITEMS_IS_LOADING";
export const MINUTE_ITEMS_LOADED = "MINUTE_ITEMS_LOADED";
export const MINUTE_ITEMS_LOAD_ERROR = "MINUTE_ITEMS_LOAD_ERROR";
/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

const API_URL = 'http://localhost:8080/api/';

export const VISIBILITY_FILTERS = {
    SHOW_ALL : "SHOW_ALL",
    SHOW_ARCHIVED : "SHOW_ARCHIVED"
};

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addMinute() { return {type: ADD_MINUTE}; }
export function updateCurrentMinuteTitle(title, id) { return {type : UPDATE_CURRENT_MINUTE_TITLE, title, id}; }
export function setMinute(id) { return {type : SET_MINUTE, id}; }

/**
 * =============================================================================
 * Minute Add
 * =============================================================================
 */
export function minuteAdding(bool) {return {type : MINUTE_ADDING, isAdding : bool}}
export function minuteAdded(minute) {return {type : MINUTE_ADDING, minute}}
export function minuteAddError(bool) {return {type : MINUTE_ADDING, hasErrored : bool}}

/**
 * =============================================================================
 * Minute Items Loading
 * =============================================================================
 */
export function minuteItemsIsLoading(bool) {return {type: MINUTE_ITEMS_IS_LOADING, isLoading : bool}}
export function minuteItemsLoaded(items) {return {type : MINUTE_ITEMS_LOADED, items}}
export function minuteItemsLoadError(bool) {return {type: MINUTE_ITEMS_LOAD_ERROR, hasErrored : bool}}

/**
 * =============================================================================
 * Action Thunk Creators
 * =============================================================================
 */
export function saveMinute(minute)
{
    return (dispatch) => {
        dispatch(minuteAdding(true));
        fetch(API_URL + 'minutes/', {
                method : 'post',
                headers : new Headers({
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }),
                body : $("#meetingDetailForm").serialize()
            })
            .then( (response) => {
                dispatch(minuteAdding(false));
                console.log("received response");
                console.log(response);
                return response
            })
            .then( (response) => response.json() )
            .then( ({items}) => {
                loadMinutes();
            } )
            .catch( () => dispatch(minuteItemsLoadError()));
    };
}

export function loadMinutes()
{
    return (dispatch) => {
        dispatch(minuteItemsIsLoading(true));
        fetch(API_URL + 'minutes/')
            .then( (response) => {
                dispatch(minuteItemsIsLoading(false));
                return response;
            })
            .then( (response) => response.json() )
            .then( ({items}) => { 
                dispatch(minuteItemsLoaded(items));
            } )
            .catch( () => dispatch(minuteItemsLoadError()));
    };
}

export function setCurrentMinute(id)
{
    return (dispatch, getState) => {
        let state = getState();
        dispatch(setMinute(id));
        dispatch(agendaItemsLoaded(state.minutes.items[id].agenda));
        dispatch(personItemsLoaded(state.minutes.items[id].invited));
        dispatch(todoItemsLoaded(state.minutes.items[id].todos));
    };
}