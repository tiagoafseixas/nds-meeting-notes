import { combineReducers } from 'redux';

import { agenda }  from './reducers/AgendaReducers';
import { minutes } from './reducers/MinutesReducers';
import { invited } from './reducers/InvitedReducers';
import { todos } from './reducers/TodoReducers';

const MEETINGS_APP = combineReducers({ minutes, agenda, invited, todos });

export default MEETINGS_APP;