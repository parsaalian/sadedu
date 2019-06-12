import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Students } from "/imports/api/students/students";

import Login from "./login/login";
import NotFound from './_global/404';
// admin panel pages
import AdminHome from "./admin/home";
import AdminStudents from "./admin/students/students";
import AdminCourses from "./admin/courses/courses";
// assistant panel pages
import AssistantHome from "./assistant/home";
import AssistantCourses from "./assistant/courses/courses";
// student panel pages
import StudentHome from "./students/home";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Login}/>

        <Route path="/admin" exact component={AdminHome} />
        <Route path="/admin/students" exact component={AdminStudents}/>
        <Route path="/admin/courses" exact component={AdminCourses}/>

        <Route path="/assistant" exact component={AssistantHome} />
        <Route path="/assistant/courses" exact component={AssistantCourses} />

        <Route path="/students" exact component={StudentHome} />

        <Route component={NotFound} />
      </BrowserRouter>
    );
  }
}
