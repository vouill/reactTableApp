import React, {Component} from 'react';
import {Button, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class SideMenuCommitSearchComponent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            showModal: false,
            commitArray: props.commitSearch
        }
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.handleKeyWordInput = this.handleKeyWordInput.bind(this)
    }

    close () {
        this.setState({ showModal: false, commitArray: this.props.commitSearch });
    }

    open () {
        this.setState({ showModal: true });
    }

    handleKeyWordInput (e) {
        const arr = this.props.commitSearch.filter(commit => {
            return (commit.message.toLowerCase().indexOf(e.target.value) !== -1)
        })
        this.setState({ commitArray: arr })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.commitSearch !== this.state.commitSearch) {
            this.setState({ commitArray: nextProps.commitSearch });
        }
    }

    render () {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    onClick={this.open}
                >
                    Search words in commits
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search words in {this.props.commitSearch.length} commits </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Key words</h4>
                        <input className="form-group form-control" onChange={this.handleKeyWordInput} type="text"/>
                        <hr/>
                        <ListGroup>
                            {this.state.commitArray.map(commit => {
                                return <ListGroupItem key={commit.sha} target="_blank"
                                                      href={'https://github.com/' + commit.repo.name + '/commit/' + commit.sha}>{commit.message}</ListGroupItem>
                            })}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

SideMenuCommitSearchComponent.propTypes = {
    commitSearch: React.PropTypes.arrayOf(React.PropTypes.shape({
        repo: React.PropTypes.object,
        author: React.PropTypes.object,
        message: React.PropTypes.string,
        url: React.PropTypes.string,
        sha: React.PropTypes.string
    })),
}