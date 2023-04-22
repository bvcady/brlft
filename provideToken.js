const jwt = require("jsonwebtoken");

const token = jwt.sign({ id: "644296836dd48a3fcbed4576" }, `V0lKR0FBTlRST1VXRU4`, {
  expiresIn: 15 * 60,
});

console.log(token);
