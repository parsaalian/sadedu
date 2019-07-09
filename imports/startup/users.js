import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { ROLES } from "./roles";

Meteor.users.after.insert(function(userID, doc) {
  if (doc.profile.type === "admin") {
    Roles.addUsersToRoles(doc._id, [ROLES.Admin]);
  } else if (doc.profile.type === "student") {
    Roles.addUsersToRoles(doc._id, [ROLES.Student]);
  } else if (doc.profile.type === "assistant") {
    Roles.addUsersToRoles(doc._id, [ROLES.Assistant]);
  }
});

if (!Accounts.findUserByUsername("admin")) {
  Accounts.createUser({
    username: "admin",
    password: "admin",
    profile: { type: "admin" }
  });
}

if (!Accounts.findUserByUsername("assistant")) {
  Accounts.createUser({
    username: "assistant",
    password: "assistant",
    profile: { type: "assistant" }
  });
}

if (!Accounts.findUserByUsername("student")) {
  Accounts.createUser({
    username: "student",
    password: "student",
    profile: { type: "student" }
  });
}
