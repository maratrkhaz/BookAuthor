import { ACTION_TYPES } from '../actions/bookActionTypes';
import {BookState } from '../../models/bookType';
import { Reducer } from 'react';
import { PageParams } from '../../models/pagination';

const initialState : BookState  = {
    books: [],
    loading: false,
    submitting: false,
    selectedBook: undefined,
    errorMessage: undefined,
    pagination: null,
    pagingParams: {pageNumber: PageParams.pageNumber, pageSize: PageParams.pageSize}
}

export const bookReducer: Reducer<BookState, any> = (state: BookState = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                books: action.payload.data,
                pagination: action.payload.pagination
            }
        case ACTION_TYPES.CREATE:
            return {
                    ...state,
                    books: [...state.books, action.payload],
                    selectedBook: action.payload,
                    loading: false,
                    submitting: true
            }
        case ACTION_TYPES.UPDATE:
            return {
                    ...state,
                    books: [...state.books.filter(x => x.bookId !== action.payload.bookId), action.payload],
                    selectedBook: action.payload,
                    loading: false,
                    submitting: true
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                books: state.books.filter(x => x.bookId !== action.payload),
                loading: true
            } 
        case ACTION_TYPES.SET_LOADING:
            return {
                    ...state,
                    loading: true
            }   
        case ACTION_TYPES.SELECT_BOOK:
            return {
                    ...state,
                    books: [...state.books.filter(x => x.bookId !== action.payload.bookId), action.payload],
                    selectedBook: action.payload
                    //selectedBook: state.books.find(x => x.bookId === action.payload),
            }    
        case ACTION_TYPES.CANCEL_SELECTED_BOOK:
            return {
                    ...state,
                    selectedBook: action.payload,
                    loading: false
            }  
        case ACTION_TYPES.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case ACTION_TYPES.CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case ACTION_TYPES.CANCEL_SUBMITTING:
            return {
                    ...state,
                    submitting: action.payload
            }
        case ACTION_TYPES.SET_PAGING_PARAMS:
            return {
                    ...state,
                    pagingParams: action.payload
            }
            
        default:
            return state
    }
}
