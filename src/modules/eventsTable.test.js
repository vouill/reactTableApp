import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, {
    retreiveGitEventsFromUrl,
    RETREIVING_EVENTS,
    EVENTS_RETREIVED,
    ERROR_WHEN_RETREIVING_EVENTS
} from './eventsTable.module'
const initialState = { status: 'idle', target: '', events: [] }

describe('eventsTable reducer test', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle RETREIVING_EVENTS', () => {
        expect(reducer(initialState, {
            type: RETREIVING_EVENTS,
            payload: 'http://someUrl.com'
        })).toEqual({
            status: 'loading',
            target: 'http://someUrl.com',
            events: []
        })
    })

    it('should handle EVENTS_RETREIVED', () => {
        expect(reducer(initialState, {
            type: EVENTS_RETREIVED,
            payload: [{ id: 1 }, { id: 2 }]
        })).toEqual({
            status: 'idle',
            target: '',
            events: [{ id: 1 }, { id: 2 }]
        })
    })

    it('should handle ERROR_WHEN_RETREIVING_EVENTS', () => {
        expect(reducer(initialState, {
            type: ERROR_WHEN_RETREIVING_EVENTS
        })).toEqual({
            status: 'error',
            target: '',
            events: []
        })
    })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    });
};

describe('async actions', () => {
    it('creates EVENTS_RETREIVED when fetching events has been done', () => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(200, null, '[{"id":1},{"id":2}]')));
        const expectedActions = [
            { type: RETREIVING_EVENTS, payload: 'someurl' },
            { type: EVENTS_RETREIVED, payload: [{ collapseState: true, id: 1 }, { collapseState: true, id: 2 }] }
        ]
        const store = mockStore({ eventsTable: [] })
        return store.dispatch(retreiveGitEventsFromUrl('someurl'))
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})