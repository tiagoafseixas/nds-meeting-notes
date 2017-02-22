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