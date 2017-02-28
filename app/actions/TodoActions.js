"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_TODO_ITEM = "ADD_TODO_ITEM";
export const REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM";
export const TODO_ITEMS_LOADED = "TODO_ITEMS_LOADED";
/**
 * OTHER CONSTANTS
 * *****************************************************************************
 */

/**
 * ACTION CREATORS
 * *****************************************************************************
 */

export function addTodoItem() { return {type: ADD_TODO_ITEM}; }
export function removeTodoItem(id) { return {type: REMOVE_TODO_ITEM, id}; }
export function todoItemsLoaded(items) {return {type : TODO_ITEMS_LOADED, items}; }