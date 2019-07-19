import { Meteor } from "meteor/meteor";
import { Registrations } from "./index";
import { Courses } from "../courses";
import { Students } from "../students/students";
import { Roles } from "meteor/alanning:roles";
import { ROLES } from "../../startup/roles";

Meteor.methods({
  "registrations.add"({ cid, group, sid }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      if (Students.findOne({ sid })) {
        if (
          Courses.findOne({
            cid: cid,
            group: group
          })
        ) {
          if (
            !Courses.findOne({
              cid: cid,
              group: group,
              $and: [
                {"this.reserveRegistered": "this.reserveCapacity"},
                {"this.registered": "this.capacity"}
              ]
            })
          ) {
            if (
              !Registrations.findOne({
                cid: cid,
                group: group,
                sid: sid
              })
            ) {
              if (
                Courses.findOne({
                  cid: cid,
                  group: group,
                  $where: "this.registered < this.capacity"
                })
              ) {
                Registrations.insert({
                  cid,
                  group,
                  sid,
                  isReserved: false,
                  placeInReservedQueue: 0
                });
                Courses.update(
                  { cid: cid, group: group },
                  { $inc: { registered: 1 } }
                );
              } else if (
                Courses.findOne({
                  cid: cid,
                  group: group,
                  $where: "this.reserveRegistered < this.reserveCapacity"
                })
              ) {
                Registrations.insert({
                  cid,
                  group,
                  sid,
                  isReserved: true,
                  placeInReservedQueue:
                    Registrations.find({ isReserved: true }).count() + 1
                });
                Courses.update(
                  { cid: cid, group: group },
                  { $inc: { reserveRegistered: 1 } }
                );
              }
            } else {
              throw new Meteor.Error("This student already has this course.");
            }
          } else {
            throw new Meteor.Error(
              "This course capacity and reserve capacity is full."
            );
          }
        } else {
          throw new Meteor.Error('This course doesn"t exist.');
        }
      } else {
        throw new Meteor.Error('This student doesn"t exist.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.remove"({ cid, group, sid }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      if (Students.findOne({ sid: sid })) {
        if (
          Courses.findOne({
            cid: cid,
            group: group
          })
        ) {
          if (
            Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid,
              isReserved: true
            })
          ) {
            const thisPlaceInReservedQueue = Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid
            }).placeInReservedQueue;
            Registrations.remove({
              cid: cid,
              group: group,
              sid: sid
            });
            Registrations.update(
              {
                cid: cid,
                group: group,
                isReserved: true,
                placeInReservedQueue: { $gt: thisPlaceInReservedQueue }
              },
              { $inc: { placeInReservedQueue: -1 } }
            );
            Courses.update(
              { cid: cid, group: group },
              { $inc: { reserveRegistered: -1 } }
            );
          } else if (
            Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid,
              isReserved: false
            })
          ) {
            Registrations.remove({
              cid: cid,
              group: group,
              sid: sid
            });
            if (
              Registrations.find({
                cid: cid,
                group: group,
                isReserved: true
              }).count() > 0
            ) {
              Registrations.update(
                {
                  cid: cid,
                  group: group,
                  isReserved: true
                },
                { $inc: { placeInReservedQueue: -1 } }
              );
              Registrations.update(
                {
                  cid: cid,
                  group: group,
                  isReserved: true,
                  placeInReservedQueue: 0
                },
                { $set: { isReserved: false } }
              );
              Courses.update(
                { cid: cid, group: group },
                { $inc: { reserveRegistered: -1 } }
              );
            } else {
              Courses.update(
                { cid: cid, group: group },
                { $inc: { registered: -1 } }
              );
            }
          } else {
            throw new Meteor.Error('This student hasn"t this course.');
          }
        } else {
          throw new Meteor.Error('This course doesn"t exist.');
        }
      } else {
        throw new Meteor.Error('This student doesn"t exist.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.removeAll"() {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      Registrations.remove({});
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.forceAdd"({ cid, group, sid }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant])) {
      if (Students.findOne({ sid: sid })) {
        if (
          Courses.findOne({
            cid: cid,
            group: group
          })
        ) {
          if (
            !Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid
            })
          ) {
            Registrations.insert({
              cid,
              group,
              sid,
              isReserved: false,
              placeInReservedQueue: 0
            });
            const course = Courses.findOne({
              cid: cid,
              group: group
            });
            if (course.registered < course.capacity) {
              Courses.update(
                { cid: cid, group: group },
                { $inc: { registered: 1 } }
              );
            } else {
              Courses.update(
                { cid: cid, group: group },
                { $inc: { registered: 1, capacity: 1 } }
              );
            }
          } else if (
            Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid,
              isReserved: true
            })
          ) {
            const thisPlaceInReservedQueue = Registrations.findOne({
              cid: cid,
              group: group,
              sid: sid
            }).placeInReservedQueue;
            Registrations.update(
              {
                cid: cid,
                group: group,
                sid: sid
              },
              { $set: { isReserved: false, placeInReservedQueue: 0 } }
            );
            Registrations.update(
              {
                cid: cid,
                group: group,
                isReserved: true,
                placeInReservedQueue: { $gt: thisPlaceInReservedQueue }
              },
              { $inc: { placeInReservedQueue: -1 } }
            );
            Courses.update(
              { cid: cid, group: group },
              { $inc: { reserveRegistered: -1, registered: 1, capacity: 1 } }
            );
          } else {
            throw new Meteor.Error("This student already has this course.");
          }
        } else {
          throw new Meteor.Error('This course doesn"t exist.');
        }
      } else {
        throw new Meteor.Error('This student doesn"t exist.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  },

  "registrations.changeGroup"({ cid, prevGroup, sid, newGroup }) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLES.Assistant, ROLES.Student])) {
      if (Students.findOne({ sid: sid })) {
        if (
          Courses.findOne({
            cid: cid,
            group: prevGroup
          })
        ) {
          if (
            Courses.findOne({
              cid: cid,
              group: newGroup
            })
          ) {
            if (prevGroup !== newGroup) {
              const course = Courses.findOne({
                cid: cid,
                group: newGroup
              });
              if (
                !(
                  course.registered === course.capacity &&
                  course.reserveRegistered === course.reserveCapacity
                )
              ) {
                Meteor.call("registrations.remove", {
                  cid,
                  prevGroup,
                  sid
                });
                Meteor.call("registrations.add", {
                  cid,
                  newGroup,
                  sid
                });
              } else {
                throw new Meteor.Error(
                  "Capacity and reserve capacity of new group is full."
                );
              }
            } else {
              throw new Meteor.Error("New group is equal to previous group.");
            }
          } else {
            throw new Meteor.Error('New group of course doesn"t exist.');
          }
        } else {
          throw new Meteor.Error('This course doesn"t exist.');
        }
      } else {
        throw new Meteor.Error('This student doesn"t exist.');
      }
    } else {
      throw new Meteor.Error("You are not allowed to do this action.");
    }
  }
});
