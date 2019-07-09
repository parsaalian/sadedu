import { Meteor } from "meteor/meteor";
import { Courses } from "../index";

Meteor.publish("courses.admin", function() {
  return Courses.find();
});
