import _ from "lodash";
import randomName from "node-random-name";

class DataGen {
  generateOne() {
    return {
      name: randomName(),
      cid: _.random(10000, 50000),
      credit: _.random(4)
    };
  }

  generate(n) {
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(this.generateOne());
    }
    console.log(array);
    return array;
  }
}

export default new DataGen();
