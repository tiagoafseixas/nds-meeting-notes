"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_PERSON_ITEM = "ADD_PERSON_ITEM";
export const REMOVE_PERSON_ITEM = "REMOVE_PERSON_ITEM";
export const PERSON_ITEMS_LOADED = "PERSON_ITEMS_LOADED";
/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addPersonItem() { return {type: ADD_PERSON_ITEM}; }
export function removePersonItem(id) { return {type: REMOVE_PERSON_ITEM, id}; }
export function personItemsLoaded(items) { return {type: PERSON_ITEMS_LOADED, items} }