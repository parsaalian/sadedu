import { Meteor } from "meteor/meteor";
import { Registrations } from "./registrations";
import { Courses } from "../courses/courses";
import { Students } from "../students/students";
import { Roles } from "meteor/alanning:roles";
import { ROLES } from "../../startup/roles";

Meteor.methods({
  "registrations.add"({cid, prereq, group, credit, sid}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      if (Students.findOne({sid: sid})) {
        if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
          if (!Courses.findOne({
            cid: cid, prereq: prereq, group: group, credit: credit, $and: [
              "this.reserveRegistered === this.reserveCapacity", "this.registered === this.capacity"]
          })) {
            if (!Registrations.findOne({cid: cid, prereq: prereq, group: group, credit: credit, sid: sid})) {
              if (Courses.findOne({
                cid: cid, prereq: prereq, group: group, credit: credit,
                $where: "this.registered < this.capacity"
              })) {
                Registrations.insert({cid, prereq, group, credit, sid, isReserved: false, placeInReservedQueue: 0});
                Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
                  {$inc: {registered: 1}});
              } else if (Courses.findOne({
                cid: cid, prereq: prereq, group: group, credit: credit,
                $where: "this.reserveRegistered < this.reserveCapacity"
              })) {
                Registrations.insert({
                  cid, prereq, group, credit, sid, isReserved: true,
                  placeInReservedQueue: Registrations.find({isReserved: true}).count() + 1
                });
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
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.remove"({cid, prereq, group, credit, sid}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      if (Students.findOne({sid: sid})) {
        if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
          if (Registrations.findOne({
            cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
            isReserved: true
          })) {
            const thisPlaceInReservedQueue = Registrations.findOne({
              cid: cid, prereq: prereq, group: group,
              credit: credit, sid: sid
            }).placeInReservedQueue;
            Registrations.remove({cid: cid, prereq: prereq, group: group, credit: credit, sid: sid});
            Registrations.update({
                cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
                isReserved: true, placeInReservedQueue: {$gt: thisPlaceInReservedQueue}
              },
              {$inc: {placeInReservedQueue: -1}});
            Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
              {$inc: {reserveRegistered: -1}});
          } else if (Registrations.findOne({
            cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
            isReserved: false
          })) {
            Registrations.remove({cid: cid, prereq: prereq, group: group, credit: credit, sid: sid});
            if (Registrations.find({
              cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
              isReserved: true
            }).count() > 0) {
              Registrations.update({
                cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
                isReserved: true
              }, {$inc: {placeInReservedQueue: -1}});
              Registrations.update({
                cid: cid, prereq: prereq, group: group, credit: credit, sid: sid,
                isReserved: true, placeInReservedQueue: 0
              }, {isReserved: false});
              Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
                {$inc: {reserveRegistered: -1}});
            } else {
              Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
                {$inc: {registered: -1}});
            }
          } else {
            throw new Meteor.Error("This student hasn\'t this course.");
          }
        } else {
          throw new Meteor.Error("This course doesn\'t exist.");
        }
      } else {
        throw new Meteor.Error("This student doesn\'t exist.");
      }
    } else {
    throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.removeAll"() {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      Registrations.remove({});
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  }
});