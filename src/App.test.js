import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {mount} from 'enzyme'

describe('Test the whole app rendering', () => {
    let app = mount(<App />)

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('should render the events table', () => {
        expect(app.find('table')).toHaveLength(1)
    })

    it('should render the form in side menu ', () => {
        expect(app.find('form')).toHaveLength(1)
    })

})