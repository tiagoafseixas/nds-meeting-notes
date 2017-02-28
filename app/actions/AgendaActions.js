"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_AGENDA_ITEM = "ADD_AGENDA_ITEM";
export const REMOVE_AGENDA_ITEM = "REMOVE_AGENDA_ITEM";
export const AGENDA_ITEMS_LOADED = "AGENDA_ITEMS_LOADED";
/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addAgendaItem() { return {type: ADD_AGENDA_ITEM}; }
export function removeAgendaItem(id) { return {type: REMOVE_AGENDA_ITEM, id}; }
export function agendaItemsLoaded(items) { return {type: AGENDA_ITEMS_LOADED, items}; }