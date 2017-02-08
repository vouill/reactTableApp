import React, {Component} from 'react';
import {Table, Panel, Image, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import moment from 'moment'

const errorTooltip = (
    <Tooltip id="tooltip">Something went wrong, check your url !</Tooltip>
);

const statusIcon = (prop) => {
    switch (prop) {
        case 'loading':
            return <Glyphicon className="gly-spin" glyph="repeat"/>
        case 'error' :
            return <OverlayTrigger placement="bottom" overlay={errorTooltip}><Glyphicon
                glyph="warning-sign"/></OverlayTrigger>
        case 'idle' :
            return <Glyphicon glyph="ok"/>
        default :
            return <Glyphicon glyph="warning-sign"/>
    }
}

export default class EventTableDisplayComponent extends Component {
    render () {
        return (
            <div>
                <Panel>
                    <h4><strong>Event Stream Table</strong> - {this.props.eventTable.events.length}</h4>
                    {statusIcon(this.props.eventTable.status)} {this.props.eventTable.target}
                    <Table responsive condensed striped>
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Created</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.eventTable.events.map(event => {
                            return <tr key={event.id}>
                                <td><a href={'https://github.com/' + event.actor.login}><Image
                                    src={event.actor.avatar_url}
                                    height="20px"
                                    rounded/></a> <a
                                    href={'https://github.com/' + event.actor.login}>{event.actor.display_login}
                                </a></td>
                                <td>{moment(event.created_at).format('DD/MM/YY, hh:mm:ss')}</td>
                                <td>{(event.type === 'PushEvent') ? <a target="_blank"
                                                                       href={'https://github.com/' + event.repo.name + '/commit/' + event.payload.head}>{event.type}</a> : event.type } </td>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                </Panel>
            </div>
        );
    }
}

EventTableDisplayComponent.propTypes = {
    eventTable: React.PropTypes.shape({
        status: React.PropTypes.string.isRequired,
        events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    }).isRequired
}


