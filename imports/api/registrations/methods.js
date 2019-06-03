import { Meteor } from "meteor/meteor";
import { Registrations } from "./registrations";

Meteor.methods({
  'registrations.add'({cid, sid}) {
    if (!Registrations.findOne({cid: cid, sid: sid})) {
      Registrations.insert({cid, sid});
    } else {
      throw new Meteor.Error('This student already has this course.');
    }
  }
});