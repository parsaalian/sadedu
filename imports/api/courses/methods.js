import { Meteor } from "meteor/meteor";
import { Courses } from "./courses";
import { Registrations } from "../registrations/registrations";

Meteor.methods({
  "courses.add"({cid, prereq, group, credit, teacher, description, faculty, section, capacity, registered,
                  reserveCapacity, reserveRegistered, exam, time}) {
    if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit}))  {
      throw new Meteor.Error("This course already exists.");
    } else {
      Courses.insert({cid, prereq, group, credit, teacher, description, faculty, section, capacity, registered,
        reserveCapacity, reserveRegistered, exam, time});
    }
  },

  "courses.remove"({cid, prereq, group, credit}) {
    if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
      Courses.remove({cid: cid, prereq: prereq, group: group, credit: credit});
      Registrations.remove({cid: cid, prereq: prereq, group: group, credit: credit});
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  },

  "courses.removeAll"() {
    Courses.remove({});
    Registrations.remove({});
  },

  "courses.changeInfo"({prevCid, prevPrereq, prevGroup, prevCredit, cid, group, credit, teacher, description,
                         faculty, section, exam, time}) {
    if (Courses.findOne({cid: prevCid, prereq: prevPrereq, group: prevGroup, credit: prevCredit})) {
      Courses.update({cid: prevCid, prereq: prevPrereq, group: prevGroup, credit: prevCredit},
        {cid: cid, group: group, credit: credit, teacher: teacher, description: description,
          faculty: faculty, section: section, exam: exam, time: time});
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  },

  "courses.changeCapacity"({cid, prereq, group, credit, newCapacity}) {
    if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
      const course = Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit}).registered;
      if (newCapacity >= course.registered) {
        Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
          {capacity: newCapacity});
        if (newCapacity > course.registered && course.reserveRegistered > 0) {
          const len = newCapacity - course.registered;
          const min = min(len, Registrations.find(
            {cid: cid, prereq: prereq, group: group, credit: credit, isReserved: true}).count());
          Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
            {$inc: {registered: min, reserveRegistered: -min}});
          Registrations.update({cid: cid, prereq: prereq, group: group, credit: credit, isReserved: true,
              placeInReservedQueue: {$le: len}}, {isReserved: false, placeInReservedQueue: 0});
          Registrations.update({cid: cid, prereq: prereq, group: group, credit: credit, isReserved: true,
            placeInReservedQueue: {$gt: len}}, {$inc: {placeInReservedQueue: -min}});
        }
      } else {
        throw new Meteor.Error("New capacity is less than registered students.");
      }
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  },

  "courses.changeReserveCapacity"({cid, prereq, group, credit, newReserveCapacity}) {
    if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
      Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
        {reserveCapacity: newReserveCapacity});
      Registrations.remove({cid: cid, prereq: prereq, group: group, credit: credit,
        placeInReservedQueue: {$gt: newReserveCapacity}});
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  },

  "courses.changePrereq"({cid, prereq, group, credit, newPrereq}) {
    if (Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit})) {
      Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
        {prereq: newPrereq});
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  }
});