import { Meteor } from "meteor/meteor";
import { Times } from "../index";

Meteor.publish("times.admin", function() {
  return Times.find();
});
