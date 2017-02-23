import { combineReducers } from 'redux';

import { agenda }  from './reducers/AgendaReducers';
import { minutes } from './reducers/MinutesReducers';

const MEETINGS_APP = combineReducers({ minutes, agenda });

export default MEETINGS_APP;