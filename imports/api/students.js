import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Students = new Mongo.Collection('students');

Students.schema = new SimpleSchema({
  sid: { type: Number },
  name: { type: String },
  familyName: { type: String },
  rand: { type: Number }
});

export const addStudent = new ValidatedMethod({
  name: 'students.add',
  validate: Students.schema.validator(),
  run({sid, name, familyName, rand}) {
    if (!Students.findOne({sid: sid})) {
      Students.insert({sid, name, familyName, rand});
    }
    else {
      throw new Meteor.Error('This student is already added.');
    }
  }
});

export const removeStudent = new ValidatedMethod({
  name: 'students.remove',
  validate: new SimpleSchema({sid: { type: String }}).validator(),
  run({sid}) {
    if (Students.findOne({sid: sid})) {
      Students.remove({sid: sid});
    }
    else {
      throw new Meteor.Error('This student is already removed.');
    }
  }
});

export const removeAllStudents = new ValidatedMethod({
  name: 'students.removeAll',
  validate: new SimpleSchema({}).validator(),
  run() {
    Students.remove({});
  }
});

export default Students;
