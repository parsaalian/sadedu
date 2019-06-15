import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
      <div style={{ textAlign: 'center', width: '100vw', height: '100vh' }}>
        <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <img src="/images/404.png" style={{ maxWidth: '50vw' }} />
          <h4 className='fa rtl'>صفحه‌ی مورد نظر یافت نشد.</h4>
          <h1 className='fa' onClick={this.back}><a>برگشت</a></h1>
        </div>
      </div>
    );
  }
}

export default withRouter(NotFound);
