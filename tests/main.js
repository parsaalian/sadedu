import { Meteor } from "meteor/meteor";
import assert from "assert";
import {Courses} from "../imports/api/courses";

describe("edu", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "edu");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

describe("courses.add", function () {
  it("should add a student to database", function () {
    Meteor.call("courses.add", {
      cid: 79414,
      title: "Some course",
      prereq: null,
      group: 1,
      credit: 3,
      teacher: "Johny Brown",
      description: "This course is awesome.",
      faculty: "-",
      section: "-",
      capacity: 34,
      registered: 0,
      reserveCapacity: 3,
      reserveRegistered: 0,
      exam: null,
      time: null
    });
    assert.strictEqual(Courses.find({cid: 79414, group: 1}).count(), 1);
    Courses.remove(Courses.findOne({cid: 79414, group: 1}));
  });
});