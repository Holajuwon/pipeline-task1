const { validateExpiryDate } = require("./validateDate");
const { validateCreditCardNumber, validateCardType } = require("./verifyCard");

class Validator {
  constructor(email, cardNumber, expiryDate, cvv, mobile) {
    this.email = email;
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    this.mobile = mobile;
    this.error = [];
  }

  async validateRequest() {
    let fields = ["email", "cardNumber", "expiryDate", "cvv", "mobile"];
    let error = {};
    for (let field of fields) {
      if (
        this[field] == null ||
        this[field] == undefined ||
        this[field] == ""
      ) {
        error[field] = ["this field cannot be empty"];
      }
    }
    if (Object.keys(error).length !== 0) this.error.push(error);
  }

  async validateValue() {
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let regMobile = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    let regCvv = /^([0-9]{3})$/;

    if (!this.email?.match(regEmail)) {
      this.error.push({ email: ["input valid email"] });
    }

    if (!this.mobile?.match(regMobile)) {
      this.error.push({ mobile: ["input valid mobile"] });
    }

    if (!this.cvv?.match(regCvv)) {
      this.error.push({ cvv: ["input valid cvv"] });
    }
  }

  async validateData() {
    const validNumber = validateCreditCardNumber(this.cardNumber);
    const validType = validateCardType(this.cardNumber);
    const validDate = validateExpiryDate(this.expiryDate);

    if (validType == null || validNumber == false) {
      this.error.push({
        cardNumber: "invalid credit card number",
      });
    }

    if (validDate !== null) {
      this.error.push(validDate);
    }
    this.validateRequest();
    this.validateValue();
    if (this.error.length === 0) {
      return null;
    }
    return this.error;
  }
}

module.exports = Validator;
