import produce from 'immer'
import {useReducer} from "react";
import constate from 'constate'
import type {F, O} from 'ts-toolbelt'
import deepmerge from '@fastify/deepmerge'

const tableInitialState = {
    filters: {},
    page: 1,
    totalItems: 0,
    pageSize: 10
}

function produceTableState<T>(fn: (draft: TableState, action: T) => void) {
    return produce((draft: TableState, action: T) => {
        fn(draft, action)
    })
}

type TableState = typeof tableInitialState


const getAction = <T, PL>(type: F.Narrow<T>, payload: PL) => ({type, ...payload})
// const getAction = <const T, PL>(type: T, payload: PL) => ({type, ...payload}) // TODO: use this when esbuild supports typescript 5.0


// ACTIONS ---
const setFilters = (filters: TableState['filters']) => getAction('SET_FILTERS', {filters})
const setPage = (page: TableState['page']) => getAction('SET_PAGE', {page})
const setTotalItems = (totalItems: TableState['totalItems']) => getAction('SET_TOTAL_ITEMS', {totalItems})


type Action = ReturnType<typeof setFilters | typeof setPage | typeof setTotalItems>
// ---


const tableReducer = produceTableState<Action>((draft, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            draft.filters = action.filters
            break
        case 'SET_PAGE':
            draft.page = action.page
            break
        case 'SET_TOTAL_ITEMS':
            draft.totalItems = action.totalItems
            break
    }
})




const useTableState = (partialInitialState: O.Partial<typeof tableInitialState, 'deep'> = {}) => {
    const initializerArg = deepmerge({all: true})(tableInitialState, partialInitialState) as typeof tableInitialState;
    const [state, dispatch] = useReducer(tableReducer, initializerArg)

    return {
        state,
        setFilters: (filters: TableState['filters']) => dispatch(setFilters(filters)),
        setPage: (page: TableState['page']) => dispatch(setPage(page)),
        setTotalItems: (totalItems: TableState['totalItems']) => dispatch(setTotalItems(totalItems))
    }
}

export const [TableStateProvider, useTableStateContext] = constate(useTableState)