import {Meteor} from "meteor/meteor";
import assert from "assert";
import {Courses} from "../imports/api/courses";

describe("edu", function () {
  it("package.json has correct name", async function () {
    const {name} = await import("../package.json");
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

const sampleCourse = {
  cid: "79414",
  title: "Some course",
  prereq: ["11111", "22222"],
  group: 1,
  credit: 3,
  teacher: "Johny Brown",
  description: "This course is awesome.",
  faculty: "-",
  section: "bsc",
  capacity: 40,
  registered: 0,
  reserveCapacity: 10,
  reserveRegistered: 0,
  exam: "Fri Oct 19 2018 17:10:12 GMT+0530 (IST)",
  time: "12:13:15",
  gender: "b",
  place: "100"
};

describe("courses.add and courses.remove", function () {
  it("should add a course to database and then remove it", function () {
    Meteor.call("courses.add", sampleCourse);
    assert.strictEqual(Courses.find({cid: sampleCourse.cid, group: sampleCourse.group}).count(), 1);
    Meteor.call("courses.remove", {cid: sampleCourse.cid, group: sampleCourse.group});
    assert.strictEqual(Courses.find({cid: sampleCourse.cid, group: sampleCourse.group}).count(), 0);
  });
});

describe("courses.changeCapacity", function () {
  it("should change the capacity of course properly", function () {
    let myCourse = sampleCourse;
    Meteor.call("courses.add", myCourse);
    Meteor.call("courses.changeCapacity", {cid: myCourse.cid, group: myCourse.group, newCapacity: 50});
    let course = Courses.findOne({cid: myCourse.cid, group: myCourse.group});
    assert.strictEqual(course.capacity, 50);
    Meteor.call("courses.remove", {cid: myCourse.cid, group: myCourse.group});

    myCourse.capacity = 40;
    myCourse.registered = 40;
    Meteor.call("courses.add", myCourse);
    (Meteor.call("courses.changeCapacity", {cid: myCourse.cid, group: myCourse.group, newCapacity: 30}, (res, err) => {
      if (err) assert(true);
      else assert(false);
    }));
    Meteor.call("courses.remove", {cid: myCourse.cid, group: myCourse.group});

    myCourse.capacity = 40;
    myCourse.registered = 40;
    myCourse.reserveRegistered = 6;
    Meteor.call("courses.add", myCourse);
    Meteor.call("courses.changeCapacity", {cid: myCourse.cid, group: myCourse.group, newCapacity: 50});
    course = Courses.findOne({cid: myCourse.cid, group: myCourse.group});
    assert.strictEqual(course.registered, 46);
    assert.strictEqual(course.reserveRegistered, 0);
    Meteor.call("courses.remove", {cid: myCourse.cid, group: myCourse.group});
  });
});

describe("courses.changeInfo", function () {
  it("should change the information of course", function () {

  });
});
