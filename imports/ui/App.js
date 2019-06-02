import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"
import { Students } from "/imports/api/students/students";

import Login from "./login/login";
// admin panel pages
import AdminHome from "./admin/home";
import AdminStudents from "./admin/students/students";
import AdminCourses from "./admin/courses/courses";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*<Route path="/" exact component={Login} />*/}
        <Route path="/" exact component={AdminHome} />
        <Route path="/admin/students" exact component={AdminStudents} />
        <Route path="/admin/courses" exact component={AdminCourses} />
      </BrowserRouter>
    );
  }
}

export default App;
