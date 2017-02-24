"use strict";

/**
 * ACTION TYPES
 * *****************************************************************************
 */

export const ADD_TODO_ITEM = "ADD_TODO_ITEM";
export const REMOVE_TODO_ITEM = "REMOVE_TODO_ITEM";

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