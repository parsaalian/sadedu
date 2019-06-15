import randomName from 'node-random-name';
import { Students } from "/imports/api/students/students";

if (!Students.findOne({})) {
  const baseSID = 95109529;
  for (var i = 0; i < 100; i++) {
    const rn = randomName().split(" ");
    const sid = String(baseSID + i);
    const name = rn[0];
    const familyName= rn[1];
    const rand = Math.floor(Math.random() * 4) + 8;
    const gender = ["m", "f"][Math.floor(Math.random() * 2)]
    Students.insert({sid, name, familyName, rand, gender});
  }
}
