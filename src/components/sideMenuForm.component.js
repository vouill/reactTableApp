import React, {Component} from 'react';
import { ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';

export default class SideMenuFormComponent extends Component {
    constructor (props) {
        super(props)
        this.handleUrlChange = this.handleUrlChange.bind(this)
        this.handleUrlButtonClick = this.handleUrlButtonClick.bind(this)
    }
    render () {
        return (
            <div>
                <div>
                    <ControlLabel>Github event stream url</ControlLabel>
                    <form onSubmit={this.handleUrlButtonClick}>
                        <input className="form-group form-control" placeholder="Event stream url" onChange={this.handleUrlChange} type="url" required/>
                        <ButtonToolbar>
                            <Button type="submit"> Go !</Button>
                            <Button bsStyle="success"
                                    onClick={() => this.props.onUrlInput('https://api.github.com/repos/rails/rails/events')}>Rails
                            </Button>
                            <Button className="ngrxButton" bsStyle="success"
                                    onClick={() => this.props.onUrlInput('https://api.github.com/repos/ngrx/example-app/events')}>Ngrx
                            </Button>
                        </ButtonToolbar>
                    </form>
                </div>
            </div>
        );
    }

    handleUrlChange (e) {
        this.urlToFetch = e.target.value
    }

    handleUrlButtonClick (e) {
        this.props.onUrlInput(this.urlToFetch)
        e.preventDefault()
    }
}

SideMenuFormComponent.propTypes = {
    onUrlInput: React.PropTypes.func.isRequired
}