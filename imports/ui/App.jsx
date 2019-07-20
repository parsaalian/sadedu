import React from "react";
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
import AssistantNotifications from "./assistant/notifications/notification";
// student panel pages
import StudentHome from "./students/home";
import StudentCourses from "./students/courses/courses";
import RegistrationPage from "./students/registration/registration";
import SchedulePage from "./students/calendar/calendar";
import ChartPage from "./students/chart/chart";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/admin" exact component={AdminHome} />
        <Route path="/admin/students" exact component={AdminStudents} />
        <Route path="/admin/courses" exact component={AdminCourses} />

        <Route path="/assistant" exact component={AssistantHome} />
        <Route path="/assistant/courses" exact component={AssistantCourses} />
        <Route path="/assistant/notifications" exact component={AssistantNotifications} />
        <Route
          path="/assistant/courses/:id"
          exact
          component={AssistantCoursePanel}
        />
F
        <Route path="/student" exact component={StudentHome} />
        <Route path="/student/courses" exact component={StudentCourses} />
        <Route
          path="/student/registration"
          exact
          component={RegistrationPage}
        />
        <Route path="/student/calendar" exact component={SchedulePage} />
        <Route path="/student/chart" exact component={ChartPage} />

        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
