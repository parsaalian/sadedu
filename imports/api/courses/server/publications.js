import { Meteor } from "meteor/meteor";
import { Courses } from "../courses";

Meteor.publish("courses.admin", function() {
  return Courses.find();
});
