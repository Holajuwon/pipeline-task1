/**
 * validates the expiry date
 * @param {String} expiryDate
 * @returns null or error message
 */
exports.validateExpiryDate = (expiryDate) => {
  const expDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const isValid = expDateRegex.test(expiryDate);

  if (!isValid) {
    return {
      expiryDate: ["invalid date, date must follow pattern mm/yy"],
    };
  }

  let month = Number(expiryDate.slice(0, 2));
  let year = Number(expiryDate.slice(3));

  if (month <= 0 || month > 12 || month == "") {
    return {
      expiryDate: ["invalid month"],
    };
  }

  if (year <= 0 || year == "" || year == null || year == undefined) {
    return {
      expiryDate: ["invalid year"],
    };
  }

  year = 2000 + year - new Date().getFullYear();
  month = month - (new Date().getMonth() + 1);

  if (year < 0) {
    return {
      expiryDate: ["this card has expired or invalid date"],
    };
  }

  if (year == 0 && month < 0) {
    return {
      expiryDate: ["this card has expired or invalid date"],
    };
  }
  return null;
};
