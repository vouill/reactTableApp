import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {connect} from "react-redux";
import {getFilteredEvents, getCommitSearchResult} from '../utils/eventTable.utils'
import {retreiveGitEventsFromUrl} from '../modules/eventsTable.module'
import {updateEndFilter, updateStartFilter}  from '../modules/filterTable.module'
import SideMenuForm from '../components/sideMenuForm.component'
import SideMenuFilter from '../components/sideMenuFilter.component'
import CommitSearch from '../components/sideMenuCommitSearch.component'

export class SideMenuContainer extends Component {
    render () {
        return (
            <Panel >
                <SideMenuForm onUrlInput={this.props.onUrlInput}></SideMenuForm>
                <hr/>
                <SideMenuFilter
                    onStartFilterUpdate={this.props.onStartFilterUpdate}
                    onEndFilterUpdate={this.props.onEndFilterUpdate}
                ></SideMenuFilter>
                <hr/>
                <CommitSearch commitSearch={this.props.commitSearch}></CommitSearch>
            </Panel>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onUrlInput: (url) => {
            dispatch(retreiveGitEventsFromUrl(url))
        },
        onStartFilterUpdate: (value) => {
            dispatch(updateStartFilter(value))
        },
        onEndFilterUpdate: (value) => {
            dispatch(updateEndFilter(value))
        }
    }
}

SideMenuContainer.propTypes = {
    commitSearch: React.PropTypes.arrayOf(React.PropTypes.shape({
        repo: React.PropTypes.object,
        author: React.PropTypes.object,
        message: React.PropTypes.string,
        url: React.PropTypes.string,
        sha: React.PropTypes.string
    })),
    onUrlInput: React.PropTypes.func.isRequired,
    onStartFilterUpdate: React.PropTypes.func.isRequired,
    onEndFilterUpdate: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        commitSearch: getCommitSearchResult(getFilteredEvents(state.eventTable, state.filter).events)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
