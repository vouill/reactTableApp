import React, {Component} from 'react';
import {ControlLabel} from 'react-bootstrap';

export default class SideMenuFilterComponent extends Component {
    constructor (props) {
        super(props)
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
    }

    render () {
        return (
            <div>
                <ControlLabel>Starting date</ControlLabel>
                <input className="form-group form-control" type="date"
                       onInput={ (e) => this.handleFilterUpdate(e, 'start')}/>
                <ControlLabel>Ending date</ControlLabel>
                <input className="form-group form-control" type="date"
                       onInput={ (e) => this.handleFilterUpdate(e, 'end')}/>
            </div>
        );
    }

    handleFilterUpdate (e, target) {
        switch (target) {
            case 'start':
                this.props.onStartFilterUpdate(e.target.value)
                return
            case 'end':
                this.props.onEndFilterUpdate(e.target.value)
                return
            default:
                console.error('Error when updating filter')
                return
        }
    }
}

SideMenuFilterComponent.propTypes = {
    onStartFilterUpdate: React.PropTypes.func.isRequired,
    onEndFilterUpdate: React.PropTypes.func.isRequired
}