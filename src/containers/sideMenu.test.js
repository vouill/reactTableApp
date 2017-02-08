import React from 'react';
import ReactDOM from 'react-dom';
import {SideMenuContainer} from './sideMenu.container'
import {mount} from 'enzyme'

describe('Test the whole app rendering', () => {
    const mockUpCommitSearch = []
    it('should render and call dispatch', () => {
        let onUrlInput = jest.fn()
        let onEStartFilterUpdate = jest.fn()
        let onEndFilterUpdate = jest.fn()
        let sideMenu = mount(<SideMenuContainer onUrlInput={onUrlInput} onStartFilterUpdate={onEStartFilterUpdate}
                                                onEndFilterUpdate={onEndFilterUpdate}
                                                commitSearch={mockUpCommitSearch}/>)
        expect(sideMenu).toBeTruthy()
        sideMenu.find('.ngrxButton').simulate('click')
        expect(onUrlInput.mock.calls).toHaveLength(1)
        expect(onUrlInput.mock.calls[0][0]).toEqual('https://api.github.com/repos/ngrx/example-app/events')
    })
})