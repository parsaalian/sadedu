import { Meteor } from "meteor/meteor";
import { Students } from "../students";

Meteor.publish("students.admin", function() {
  return Students.find();
});
