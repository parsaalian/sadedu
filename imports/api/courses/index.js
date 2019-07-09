import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import "./methods";

const Courses = new Mongo.Collection("courses");

Courses.schema = new SimpleSchema({
  cid: { type: String, min: 5, max: 5 },
  title: { type: String },
  prereq: { type: [String], min: 5, max: 5, optional: true },
  group: { type: Number },
  credit: { type: Number, min: 0, max: 4 },
  teacher: { type: String, optional: true },
  description: { type: String, optional: true },
  faculty: { type: String },
  section: { type: String, allowedValues: ["bsc", "mst", "phd"] },
  capacity: { type: Number, min: 0 },
  registered: { type: Number, min: 0, defaultValue: 0 },
  reserveCapacity: { type: Number, min: 0 },
  reserveRegistered: { type: Number, min: 0, defaultValue: 0 },
  exam: { type: Date },
  time: { type: String },
  gender: { type: String, defaultValue: "b", allowedValues: ["m", "f", "b"] },
  place: { type: String, optional: true }
});

Courses.attachSchema(Courses.schema);

export { Courses };
