import {combineReducers} from 'redux'
import { bookReducer } from './bookReducer';
import { userReducer } from './userReducer';
import { modalReducer } from './modalReducer';

export const reducers = combineReducers({
   bookReducer,
   userReducer,
   modalReducer
})

export type RootState = ReturnType<typeof reducers>