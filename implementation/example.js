const Enum = require("./enum");

// Define an enum with reverse mapping
const Status = Enum.define(
  {
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3
  },
  { reverseMapping: true }
);

console.log(Status.PENDING); // 1
console.log(Status[1]); // "PENDING"
console.log(Status.hasKey("APPROVED")); // true
console.log(Status.hasValue(3)); // true
console.log(Status.isValid(4)); // false
console.log(Status.keys()); // ['PENDING', 'APPROVED', 'REJECTED']
console.log(Status.values()); // [1, 2, 3]
console.log(Status.entries()); // [['PENDING', 1], ['APPROVED', 2], ['REJECTED', 3]]
console.log(Status.toString());
// {
//   "PENDING": 1,
//   "APPROVED": 2,
//   "REJECTED": 3
// }
