import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./login";
import NotFound from "./_global/404";
// admin panel pages
import AdminHome from "./admin";
import AdminStudents from "./admin/students";
import AdminCourses from "./admin/courses";
// assistant panel pages
import AssistantHome from "./assistant";
import AssistantCourses from "./assistant/courses";
import AssistantCoursePanel from "./assistant/coursePanel";
// student panel pages
import StudentHome from "./students/home";
import StudentCourses from "./students/courses/courses";
import RegistrationPage from "./students/registration/registration";
import SchedulePage from "./students/calendar/calendar";
import ChartPage from "./students/chart/chart";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />

          <Route path="/admin" exact component={AdminHome} />
          <Route path="/admin/students" exact component={AdminStudents} />
          <Route path="/admin/courses" exact component={AdminCourses} />

          <Route path="/assistant" exact component={AssistantHome} />
          <Route path="/assistant/courses" exact component={AssistantCourses} />
          <Route
            path="/assistant/courses/:id"
            exact
            component={AssistantCoursePanel}
          />

          <Route path="/students" exact component={StudentHome} />
          <Route path="/students/courses" exact component={StudentCourses} />
          <Route
            path="/students/registration"
            exact
            component={RegistrationPage}
          />
          <Route path="/students/calendar" exact component={SchedulePage} />
          <Route path="/students/chart" exact component={ChartPage} />

          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
