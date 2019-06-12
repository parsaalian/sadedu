import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
  }

  back(e) {
    e.preventDefault();
    this.props.history.go(-1);
  }

  render() {
    return (
      <div>
        404
        <p onClick={this.back}>back</p>
      </div>
    );
  }
}

export default withRouter(NotFound);
