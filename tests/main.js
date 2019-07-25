import {Meteor} from "meteor/meteor";
import assert from "assert";
import {Courses} from "../imports/api/courses";
import {Registrations} from "../imports/api/registrations";
import {Students} from "../imports/api/students/students";

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

const s1 = {sid: "1", name: "1", familyName: "1", rand: 9, gender: "m"};
const s2 = {sid: "2", name: "2", familyName: "2", rand: 9, gender: "m"};
const s3 = {sid: "3", name: "3", familyName: "3", rand: 9, gender: "m"};
const s4 = {sid: "4", name: "4", familyName: "4", rand: 9, gender: "m"};
const s5 = {sid: "5", name: "5", familyName: "5", rand: 9, gender: "m"};
const s6 = {sid: "6", name: "6", familyName: "6", rand: 9, gender: "m"};

const r1 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s1.sid};
const r2 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s2.sid};
const r3 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s3.sid};
const r4 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s4.sid};
const r5 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s5.sid};
const r6 = {cid: sampleCourse.cid, group: sampleCourse.group, sid: s6.sid};

describe("courses.add and courses.remove", function () {
  it("should add a course to database and then remove it", function () {
    Meteor.call("courses.add", sampleCourse);
    assert.strictEqual(Courses.find({cid: sampleCourse.cid, group: sampleCourse.group}).count(), 1);
    Meteor.call("courses.remove", {cid: sampleCourse.cid, group: sampleCourse.group});
    assert.strictEqual(Courses.find({cid: sampleCourse.cid, group: sampleCourse.group}).count(), 0);
  });
});

describe("students.add and students.remove", function () {
  it("should add students to database", function () {
    Meteor.call("students.add", s1);
    assert.strictEqual(Students.find({sid: s1.sid}).count(), 1);
    Meteor.call("students.remove", s1);
    assert.strictEqual(Students.find({sid: s1.sid}).count(), 0);
  });
});

describe("registers.add and registers.remove", function () {
  it("should register students in course", function () {
    Meteor.call("courses.add", sampleCourse);
    Meteor.call("students.add", s1);
    Meteor.call("registrations.add", r1);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).registered, 1);
    assert.strictEqual(Registrations.find({cid: r1.cid, group: r1.group, sid: r1.sid}).count(), 1);
    Meteor.call("registrations.remove", r1);
    Meteor.call("courses.remove", sampleCourse);
    Meteor.call("students.remove", s1);

    let myCourse = sampleCourse;
    myCourse.registered = sampleCourse.capacity;
    Meteor.call("courses.add", myCourse);
    Meteor.call("students.add", s1);
    Meteor.call("registrations.add", r1);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).registered, 40);
    assert.strictEqual(Registrations.find({cid: r1.cid, group: r1.group, sid: r1.sid}).count(), 1);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).reserveRegistered, 1);
    Meteor.call("students.add", s2);
    Meteor.call("registrations.add", r2);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).reserveRegistered, 2);
    assert.strictEqual(Registrations.findOne({cid: r1.cid, group: r1.group, sid: r1.sid}).placeInReservedQueue, 1);
    assert.strictEqual(Registrations.findOne({cid: r2.cid, group: r2.group, sid: r2.sid}).placeInReservedQueue, 2);
    Meteor.call("registrations.remove", r1);
    Meteor.call("registrations.remove", r2);
    Meteor.call("courses.remove", myCourse);
    Meteor.call("students.remove", s1);
    Meteor.call("students.remove", s2);

    myCourse.registered = sampleCourse.capacity;
    myCourse.reserveRegistered = myCourse.reserveCapacity;
    Meteor.call("courses.add", myCourse);
    Meteor.call("students.add", s1);
    (Meteor.call("registrations.add", r1, (res, err) => {
      if (err) assert(true);
      else assert(false);
    }));
    Meteor.call("courses.remove", myCourse);
    Meteor.call("students.remove", s1);

    myCourse.registered = sampleCourse.capacity;
    myCourse.reserveRegistered = myCourse.reserveCapacity;
    Meteor.call("courses.add", myCourse);
    Meteor.call("students.add", s1);
    Meteor.call("registrations.forceAdd", r1);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).registered, 41);
    assert.strictEqual(Courses.findOne({cid: sampleCourse.cid, group: sampleCourse.group}).capacity, 41);
    assert.strictEqual(Registrations.find({cid: r1.cid, group: r1.group, sid: r1.sid}).count(), 1);
    Meteor.call("registrations.remove", r1);
    Meteor.call("courses.remove", myCourse);
    Meteor.call("students.remove", s1);
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
    myCourse.reserveRegistered = 0;
    myCourse.reserveCapacity = 10;
    Meteor.call("courses.add", myCourse);
    Meteor.call("students.add", s1);
    Meteor.call("students.add", s2);
    Meteor.call("students.add", s3);
    Meteor.call("students.add", s4);
    Meteor.call("students.add", s5);
    Meteor.call("students.add", s6);
    Meteor.call("registrations.add", r1);
    Meteor.call("registrations.add", r2);
    Meteor.call("registrations.add", r3);
    Meteor.call("registrations.add", r4);
    Meteor.call("registrations.add", r5);
    Meteor.call("registrations.add", r6);
    assert.strictEqual(Registrations.find({
      cid: sampleCourse.cid,
      group: sampleCourse.group,
      isReserved: true
    }).count(), 6);
    course = Courses.findOne({cid: myCourse.cid, group: myCourse.group});
    assert.strictEqual(course.reserveRegistered, 6);
    Meteor.call("courses.changeCapacity", {cid: myCourse.cid, group: myCourse.group, newCapacity: 50});
    course = Courses.findOne({cid: myCourse.cid, group: myCourse.group});
    assert.strictEqual(course.registered, 46);
    assert.strictEqual(course.reserveRegistered, 0);
    assert.strictEqual(Registrations.findOne({cid: r4.cid, group: r4.group, sid: r4.sid}).placeInReservedQueue, 0);
    assert.strictEqual(Registrations.findOne({cid: r4.cid, group: r4.group, sid: r4.sid}).isReserved, false);

    Meteor.call("registrations.remove", r1);
    Meteor.call("registrations.remove", r2);
    Meteor.call("registrations.remove", r3);
    Meteor.call("registrations.remove", r4);
    Meteor.call("registrations.remove", r5);
    Meteor.call("registrations.remove", r6);
    Meteor.call("courses.remove", {cid: myCourse.cid, group: myCourse.group});
    Meteor.call("students.remove", s1);
    Meteor.call("students.remove", s2);
    Meteor.call("students.remove", s3);
    Meteor.call("students.remove", s4);
    Meteor.call("students.remove", s5);
    Meteor.call("students.remove", s6);
  });
});

describe("courses.changeInfo", function () {
  it("should change the information of course", function () {

  });
});
