"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_MINUTE = "ADD_MINUTE";
export const GET_MINUTE = "GET_MINUTE";
export const ARCHIVE_MINUTE = "ARCHIVE_MINUTE";
export const SAVE_MINUTE = "SAVE_MINUTE";
export const LOAD_MINUTES = "LOAD_MINUTES";
export const UPDATE_CURRENT_MINUTE_TITLE = "UPDATE_CURRENT_MINUTE_TITLE";
export const SET_MINUTE = "SET_MINUTE";

/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

export const VISIBILITY_FILTERS = {
    SHOW_ALL : "SHOW_ALL",
    SHOW_ARCHIVED : "SHOW_ARCHIVED"
};

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addMinute() { return {type: ADD_MINUTE}; }
export function getMinute() { return {type: GET_MINUTE, id}; }
export function archiveMinute() { return {type: ARCHIVE_MINUTE, id}; }
export function saveMinute() { return {type: SAVE_MINUTE, minute}; }
export function loadMinutes() { return {type : LOAD_MINUTES}; }
export function updateCurrentMinuteTitle(title, id) { return {type : UPDATE_CURRENT_MINUTE_TITLE, title, id}; }
export function setMinute(id) { return {type : SET_MINUTE, id}; }