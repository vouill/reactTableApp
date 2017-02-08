// Constants
const UPDATE_FILTERS_START = '[EventFilters] Updating event start'
const UPDATE_FILTERS_END = '[EventFilters] Updating event end'

// Actions
export const updateStartFilter = (start) => {
    return {
        type: UPDATE_FILTERS_START,
        payload: start
    }
}

export const updateEndFilter = (end) => {
    return {
        type: UPDATE_FILTERS_END,
        payload: end
    }
}

// Reducer
const initialState = { status: 'idle', start: null, end: null }
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FILTERS_START:
            return { ...state, start: action.payload }

        case UPDATE_FILTERS_END:
            return { ...state, end: action.payload }

        default:
            return state
    }
}

export default filterReducer