import _ from "lodash";
import { Courses } from "/imports/api/courses";
import courseList from "./server/courses.json";

_.forEach(courseList, (course) => {
  if (!Courses.findOne({cid: course.cid, group: course.group, credit: course.credit})) {
    Courses.insert(course);
  }
});
