import React, {Component} from "react";
import {Layout} from "antd";
import Menu from './menu/menu';

export default class Page extends Component {
  render() {
    return (
      <Layout style={{minHeight: '100vh', backgroundColor: '#f5f5f5'}}>
        <Menu/>

        <Layout.Content style={{backgroundColor: '#f5f5f5', padding: '32px'}}>
          {this.props.children}
        </Layout.Content>

        <Layout.Footer style={{textAlign: "center", backgroundColor: '#f5f5f5'}}>
          <span style={{fontFamily: 'IRANSans'}}>
          © سامانه آموزش دانشگاه صنعتی شریف ۱۳۹۸
          </span>
        </Layout.Footer>
      </Layout>
    );
  }
}
