import { Meteor } from "meteor/meteor";
import { Registrations } from "./registrations";

Meteor.methods({
  "registrations.add"({cid, sid}) {
    if (!Registrations.findOne({cid: cid, sid: sid})) {
      Registrations.insert({cid, sid});
    } else {
      throw new Meteor.Error("This student already has this course.");
    }
  },

  "registrations.remove"({cid, sid}) {
    if (Registrations.findOne({cid: cid, sid: sid})) {
      Registrations.remove({cid, sid});
    } else if (!Registrations.findOne({cid: cid})) {
      throw new Meteor.Error("This course doesn\"t exist.");
    } else if (!Registrations.findOne({sid: sid})) {
      throw new Meteor.Error("This student doesn\"t exist.");
    } else {
      throw new Meteor.Error("This student doesn\"t take this course.");
    }
  },

  "registrations.removeAll"() {
    Registrations.remove({});
  }
});