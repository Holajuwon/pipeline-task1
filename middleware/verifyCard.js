/**
 * verifies the credit card number using luhn's algorithm
 * @param {String} cardNumber
 * @returns  returns true or false
 */
exports.validateCreditCardNumber = (cardNumber) => {
  const numberOfDigits = cardNumber.length;

  let sum = 0;
  let isSecond = false;

  for (let i = numberOfDigits - 1; i >= 0; i--) {
    let digit = cardNumber[i].charCodeAt() - "0".charCodeAt();

    if (isSecond == true) {
      digit = digit * 2;
    }

    sum += parseInt(digit / 10, 10);
    sum += digit % 10;

    isSecond = !isSecond;
  }

  return sum % 10 == 0;
};

/**
 * verifies the credit card company
 * @param {String} cardNumber
 * @returns  returns card company name or null
 */
exports.validateCardType = (cardNumber) => {
  cardNumber = cardNumber.split(" ").join("");
  var companies = {
    mastercard: /^5[1-5][0-9]{14}$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro:
      /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    verve: /^((506(0|1))|(507(8|9))|(6500))[0-9]{12,15}$/,
  };
  for (var company in companies) {
    if (companies[company].test(cardNumber)) {
      return company;
    }
  }
  return null;
};
