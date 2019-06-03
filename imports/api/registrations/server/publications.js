import { Meteor } from "meteor/meteor";
import { Registrations } from "../registrations";

Meteor.publish("registrations.admin", function () {
  return Registrations.find();
});