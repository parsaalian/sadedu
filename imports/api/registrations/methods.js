import { Meteor } from "meteor/meteor";
import { Registrations } from "./registrations";
import { Courses } from "../courses/courses";
import { Students } from "../students/students";

Meteor.methods({
  "registrations.add"({cid, prereq, group, credit, sid}) {
    if (Students.findOne({sid: sid})) {
      if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
        if (!Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit, $and: [
            "this.reserveRegistered === this.reserveCapacity", "this.registered === this.capacity"]})) {
          if (!Registrations.findOne({cid: cid, prereq: prereq, group: group, credit: credit, sid: sid})) {
            if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit,
              $where: "this.registered < this.capacity"})) {
              Registrations.insert({cid, prereq, group, credit, sid, $set: {isReserved: false}});
              Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
                {$inc: {registered: 1}});
            } else if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit,
              $where: "this.reserveRegistered < this.reserveCapacity"})) {
              Registrations.insert({cid, prereq, group, credit, sid, $set: {isReserved: true}});
              Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
                {$inc: {reserveRegistered: 1}});
            }
          } else {
            throw new Meteor.Error("This student already has this course.");
          }
        } else {
          throw new Meteor.Error("This course capacity and reserve capacity is full.");
        }
      } else {
        throw new Meteor.Error("This course doesn\'t exist.");
      }
    } else {
      throw new Meteor.Error("This student doesn\'t exist.");
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