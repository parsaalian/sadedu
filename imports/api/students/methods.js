import { Meteor } from 'meteor/meteor';
import { Students } from './students';

Meteor.methods({
  'students.add'({sid, name, familyName, rand}) {
    if (!Students.findOne({sid: sid})) {
      Students.insert({sid, name, familyName, rand});
    }
    else {
      throw new Meteor.Error('This student is already added.');
    }
  },

  'students.remove'({sid}) {
    if (Students.findOne({sid: sid})) {
      Students.remove({sid: sid});
    }
    else {
      throw new Meteor.Error('This student is already removed.');
    }
  },

  'students.removeAll'() {
    Students.remove({});
  }
});
