"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_AGENDA_ITEM = "ADD_AGENDA_ITEM";
export const REMOVE_AGENDA_ITEM = "REMOVE_AGENDA_ITEM";

/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addAgendaItem() { return {type: ADD_MINUTE}; }
export function removeAgendaItem() { return {type: GET_MINUTE, id}; }