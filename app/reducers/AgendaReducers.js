import { ADD_AGENDA_ITEM } from "../actions/AgendaActions"

export function agenda(state = { lastid : 0, items : {}}, action)
{
    switch(action.type)
    {
        case ADD_AGENDA_ITEM:
            let newId = state.lastid + 1;
            let items = Object.assign({}, state.items, { newId : {}});
            return Object.assign({}, state, { items });
        default:
            return state;
    }
}