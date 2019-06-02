import { Meteor } from "meteor/meteor";
import { Students } from "./students";

Meteor.methods({
  "students.add"({sid, name, familyName, rand}) {
    if (!Students.findOne({sid})) {
      Students.insert({sid, name, familyName, rand});
    }
    else {
      throw new Meteor.Error("This student is already added.");
    }
  },

  "students.remove"({sid}) {
    if (!Students.findOne({sid})) {
      throw new Meteor.Error("This student is already removed.");
    }
    else {
      Students.remove({sid: sid});
    }
  },

  "students.removeAll"() {
    Students.remove({});
  }
});
