import { Meteor } from "meteor/meteor";
import { Registrations } from "../index";

Meteor.publish("registrations.admin", function() {
  return Registrations.find();
});
