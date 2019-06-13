import { Meteor } from "meteor/meteor";
import { Students } from "./students";
import { Roles } from "meteor/alanning:roles";
import {ROLES} from "../../startup/roles";

Meteor.methods({
  "students.add"({sid, name, familyName, rand}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Admin])) {
      if (!Students.findOne({sid})) {
        Students.insert({sid, name, familyName, rand});
      } else {
        throw new Meteor.Error("This student is already added.");
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "students.remove"({sid}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Admin])) {
      if (!Students.findOne({sid})) {
        throw new Meteor.Error("This student is already removed.");
      } else {
        Students.remove({sid: sid});
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "students.removeAll"() {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Admin])) {
      Students.remove({});
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  }
});
