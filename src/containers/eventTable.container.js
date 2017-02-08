import React, {Component} from 'react';
import {connect} from "react-redux";
import {getFilteredEvents} from '../utils/eventTable.utils'
import TableDisplay from '../components/eventTableDisplay.component'
import './table.css'

class EventTableContainer extends Component {
    render () {
        return (
            <div>
                <TableDisplay eventTable={this.props.eventTable}></TableDisplay>
            </div>
        );
    }
}

EventTableContainer.propTypes = {
    eventTable: React.PropTypes.shape({
        status: React.PropTypes.string.isRequired,
        events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    }).isRequired
}

const mapStateToProps = (state) => {
    return {
        eventTable: getFilteredEvents(state.eventTable, state.filter)
    }
}

export default connect(mapStateToProps)(EventTableContainer);
