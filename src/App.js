import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Menu from './containers/sideMenu.container.js';
import Table from './containers/eventTable.container.js';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import eventTableReducer from './modules/eventsTable.module'
import filterReducer from './modules/filterTable.module'

const store = applyMiddleware(thunk)(createStore)(combineReducers({
    eventTable: eventTableReducer,
    filter: filterReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import './App.css'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <div className="app--view">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={3}><Menu></Menu></Col>
                            <Col xs={12} md={9}><Table/></Col>
                        </Row>
                    </Grid>
                </div>
            </Provider>
        );
    }
}

export default App;
