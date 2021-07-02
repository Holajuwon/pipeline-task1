const { validateAuth } = require("../middleware/authenticateUser");
const Validator = require("../middleware/requestValidator");
const { getRequestData } = require("../utils/getRequestData");

/**
 * card controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns http response
 */
exports.payment = async (req, res) => {
  try {
    const request = await getRequestData(req);
    const { email, cvv, mobile, cardNumber, expiryDate } = JSON.parse(request);
    const validationResponse = await new Validator(
      email,
      cardNumber,
      expiryDate,
      cvv,
      mobile
    ).validateData();

    if (validationResponse !== null) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "fail",
          code: 400,
          message: "validation error",
          error: validationResponse,
          valid: false,
        })
      );
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "success",
        message: "validation successful",
        valid: true,
        code: 200,
      })
    );
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "fail",
        message: error.message,
      })
    );
  }
};
