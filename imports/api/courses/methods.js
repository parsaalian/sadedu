import { Meteor } from "meteor/meteor";
import { Courses } from "./index";
import { Registrations } from "../registrations/registrations";
import { Roles } from "meteor/alanning:roles";
import { ROLES } from "../../startup/roles";

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
    time
  }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: cid,
          prereq: prereq,
          group: group,
          credit: credit
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
          time
        });
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.remove"({ cid, prereq, group, credit }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: cid,
          prereq: prereq,
          group: group,
          credit: credit
        })
      ) {
        Courses.remove({
          cid: cid,
          prereq: prereq,
          group: group,
          credit: credit
        });
        Registrations.remove({
          cid: cid,
          prereq: prereq,
          group: group,
          credit: credit
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
    prevPrereq,
    prevGroup,
    prevCredit,
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
    time
  }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (
        Courses.findOne({
          cid: prevCid,
          prereq: prevPrereq,
          group: prevGroup,
          credit: prevCredit
        })
      ) {
        Courses.update(
          {
            cid: prevCid,
            prereq: prevPrereq,
            group: prevGroup,
            credit: prevCredit
          },
          {
            cid: cid,
            title: title,
            group: group,
            credit: credit,
            teacher: teacher,
            description: description,
            faculty: faculty,
            section: section,
            exam: exam,
            time: time
          }
        );
        Meteor.call("courses.changePrereq", {
          cid,
          prevPrereq,
          group,
          credit,
          prereq
        });
        Meteor.call("courses.changeCapacity", {
          cid,
          prereq,
          group,
          credit,
          capacity
        });
        Meteor.call("courses.changeReserveCapacity", {
          cid,
          prereq,
          group,
          credit,
          reserveCapacity
        });
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeCapacity"({ cid, group, credit, newCapacity }) {
    if (true /*Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])*/) {
      const course = Courses.findOne({ cid, group, credit });
      if (course) {
        if (newCapacity >= course.registered) {
          Courses.update(course._id, { $set: { capacity: newCapacity } });
          if (newCapacity > course.registered && course.reserveRegistered > 0) {
            const len = newCapacity - course.registered;
            const min = min(
              len,
              Registrations.find({
                cid,
                group,
                credit,
                isReserved: true
              }).count()
            );
            Courses.update(course, {
              $inc: { registered: min, reserveRegistered: -min }
            });
            Registrations.update(
              {
                cid,
                group,
                credit,
                isReserved: true,
                placeInReservedQueue: { $le: len }
              },
              { $set: { isReserved: false, placeInReservedQueue: 0 } }
            );
            Registrations.update(
              {
                cid,
                group,
                credit,
                isReserved: true,
                placeInReservedQueue: { $gt: len }
              },
              { $inc: { placeInReservedQueue: -min } }
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

  "courses.changeReserveCapacity"({ cid, group, credit, newReserveCapacity }) {
    if (true /*Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])*/) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
          credit: credit
        })
      ) {
        Courses.update(
          { cid: cid, group: group, credit: credit },
          { $set: { reserveCapacity: newReserveCapacity } }
        );
        Registrations.remove({
          cid: cid,
          group: group,
          credit: credit,
          placeInReservedQueue: { $gt: newReserveCapacity }
        });
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeTeacher"({ cid, group, credit, newTeacher }) {
    if (true /*Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])*/) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
          credit: credit
        })
      ) {
        Courses.update(
          { cid: cid, group: group, credit: credit },
          { $set: { teacher: newTeacher } }
        );
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "courses.changeDescription"({ cid, group, credit, newDescription }) {
    if (true /*Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])*/) {
      if (
        Courses.findOne({
          cid: cid,
          group: group,
          credit: credit
        })
      ) {
        Courses.update(
          { cid: cid, group: group, credit: credit },
          { $set: { description: newDescription } }
        );
      } else {
        throw new Meteor.Error('This course doesn"t exists.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  }
});
