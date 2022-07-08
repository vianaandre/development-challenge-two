import { body } from "express-validator";

const requiredPatientsRequest = [
  body("name").isString(),
  body("email").isEmail(),
  body("birth_date").isDate(),
  body("address.city").isString(),
  body("address.state").isString(),
  body("address.postcode").isString(),
  body("address.number").isNumeric(),
  body("address.neighborhood").isString(),
];

export { requiredPatientsRequest };
