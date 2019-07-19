import {Meteor} from "meteor/meteor";
import {Courses} from "./index";
import {Registrations} from "../registrations";
import {Roles} from "meteor/alanning:roles";
import {ROLES} from "../../startup/roles";

const withoutFilter = {
  filter: false
};

Meteor.methods({
  "courses.add"({
                  cid,
                  title,
                  prereq,
                  group,
                  credit,
                  teacher,
                  description,
                  faculty,
                  section,
                  capacity,
                  registered,
                  reserveCapacity,
                  reserveRegistered,
                  exam,
                  time,
                  gender,
                  place
                }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant]) || true) { //TODO: Remove || true
      if (
        Courses.findOne({
          cid: cid,
          group: group
        })
      ) {
        throw new Meteor.Error("This course already exists.");
      } else {
        Courses.insert({
          cid,
          title,
          prereq,
          group,
          credit,
          teacher,
          description,
          faculty,
          section,
          capacity,
          registered,
          reserveCapacity,
          reserveRegistered,
          exam,
          time,
          gender,
          place
        });
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.remove"({cid, group}) {
    if (true || Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) { //TODO: remove true
      if (
        Courses.findOne({
          cid: cid,
          group: group
        })
      ) {
        Courses.remove({
          cid: cid,
          group: group
        });
        Registrations.remove({
          cid: cid,
          group: group
        });
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.removeAll"() {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      Courses.remove({});
      Registrations.remove({});
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeInfo"({
                         prevCid,
                         prevGroup,
                         cid,
                         title,
                         group,
                         prereq,
                         credit,
                         teacher,
                         description,
                         faculty,
                         section,
                         capacity,
                         reserveCapacity,
                         exam,
                         time,
                         gender,
                         place
                       }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: prevCid,
          group: prevGroup
        })
      ) {
        Courses.update(
          {
            cid: prevCid,
            group: prevGroup,
          },
          {
            $set: {
              cid: cid,
              title: title,
              group: group,
              credit: credit,
              teacher: teacher,
              description: description,
              faculty: faculty,
              section: section,
              exam: exam,
              time: time,
              gender: gender,
              place: place
            }
          }
        );
        Meteor.call("courses.changePrereq", {
          cid,
          group,
          prereq
        });
        Meteor.call("courses.changeCapacity", {
          cid,
          group,
          capacity
        });
        Meteor.call("courses.changeReserveCapacity", {
          cid,
          group,
          reserveCapacity
        });
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeCapacity"({cid, group, newCapacity}) {
    if (true /*Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])*/) { //TODO: remove true //TODO: after increasing the capacity of the course, reserved people didn't add to the main capacity
      const course = Courses.findOne({cid, group});
      if (course) {
        if (newCapacity >= course.registered) {
          Courses.update(course._id, {$set: {capacity: newCapacity}});
          if (newCapacity > course.registered && course.reserveRegistered > 0) {
            const len = newCapacity - course.registered;
            const min = Math.min(
              len,
              Registrations.find({
                cid,
                group,
                isReserved: true
              }).count()
            );
            Courses.update(course, {
              $inc: {registered: min, reserveRegistered: -min}
            });
            Registrations.update(
              {
                cid,
                group,
                isReserved: true,
                placeInReservedQueue: {$lte: len}
              },
              {$set: {isReserved: false, placeInReservedQueue: 0}}
            );
            Registrations.update(
              {
                cid,
                group,
                isReserved: true,
                placeInReservedQueue: {$gt: len}
              },
              {$inc: {placeInReservedQueue: -min}}
            );
          }
        } else {
          throw new Meteor.Error(
            "New capacity is less than registered students."
          );
        }
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeReserveCapacity"({cid, group, newReserveCapacity}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
        })
      ) {
        Courses.update(
          {cid: cid, group: group},
          {$set: {reserveCapacity: newReserveCapacity}}
        );
        Registrations.remove({
          cid: cid,
          group: group,
          placeInReservedQueue: {$gt: newReserveCapacity}
        });
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeTeacher"({cid, group, newTeacher}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
        })
      ) {
        Courses.update(
          {cid: cid, group: group},
          {$set: {teacher: newTeacher}}
        );
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeDescription"({cid, group, newDescription}) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
        })
      ) {
        Courses.update(
          {cid: cid, group: group},
          {$set: {description: newDescription}}
        );
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  }
});
