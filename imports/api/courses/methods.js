import { Meteor } from "meteor/meteor";
import { Courses } from "./courses";

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
      Courses.remove({cid: cid, prereq: prereq, group: group, credit: credit})
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  },

  "courses.removeAll"() {
    Courses.remove({});
  },

  "courses.changeInfo"({prevCid, prevPrereq, prevGroup, prevCredit, cid, prereq, group, credit, teacher, description,
                         faculty, section, capacity, registered, reserveCapacity, reserveRegistered, exam, time}) {
    if (Courses.findOne({cid: prevCid, prereq: prevPrereq, group: prevGroup, credit: prevCredit})) {
      Courses.update({cid: prevCid, prereq: prevPrereq, group: prevGroup, credit: prevCredit},
        {cid, prereq, group, credit, teacher, description, faculty, section, capacity, registered,
          reserveCapacity, reserveRegistered, exam, time});
    } else {
      throw new Meteor.Error("This course doesn\'t exists.");
    }
  }
});