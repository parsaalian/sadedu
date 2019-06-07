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
      if (newCapacity >= Courses.findOne({cid: cid, prereq: prereq, group: group, credit: credit}).registered) {
        Courses.update({cid: cid, prereq: prereq, group: group, credit: credit},
          {capacity: newCapacity});
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