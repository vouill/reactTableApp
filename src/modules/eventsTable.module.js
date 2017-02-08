// Constants

export const RETREIVING_EVENTS = '[Events] Retreiving events from git...'
export const EVENTS_RETREIVED = '[Events] Events retrevied'
export const ERROR_WHEN_RETREIVING_EVENTS = '[Events] Error when retreiving events'

// Action creators
const fetchingGitEventsFromUrl = (url) => {
    return {
        type: RETREIVING_EVENTS,
        payload: url
    }
}


const gitEventsRetrieved = (events) => {
    return {
        type: EVENTS_RETREIVED,
        payload: events
    }
}

const errorWhenRetriveingEvents = () => {
    return {
        type: ERROR_WHEN_RETREIVING_EVENTS
    }
}

export const retreiveGitEventsFromUrl = (url) => {
    return function (dispatch) {
        dispatch(fetchingGitEventsFromUrl(url))
        return fetch(url, {
            method: 'get',
        }).then(response => {
            response.json().then(json => {
                json.forEach(event => {
                    event.collapseState = true
                })
                dispatch(gitEventsRetrieved(json))
            })
                .catch(err => {
                    console.error(err)
                    dispatch(errorWhenRetriveingEvents())
                })
        }).catch(err => {
            console.error(err)
            dispatch(errorWhenRetriveingEvents())
        });
    }
}

// Reducer
const initialState = { status: 'idle', target: '', events: [] }
const eventTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETREIVING_EVENTS:
            return { ...state, status: 'loading', events: [], target: action.payload }

        case EVENTS_RETREIVED:
            return { ...state, status: 'idle', events: action.payload }

        case ERROR_WHEN_RETREIVING_EVENTS:
            return { ...state, status: 'error', events: [] }

        default:
            return state
    }
}

export default eventTableReducer