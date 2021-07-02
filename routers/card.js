const { payment } = require("../controllers/cardController");
const { validateAuth } = require("../middleware/authenticateUser");
const { getRequestData } = require("../utils/getRequestData");

/**
 * api router
 * @param {Request} req http request
 * @param {Response} res http response
 */
exports.route = async (req, res) => {
  if (req.url == "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: "success",
        message: "Welcome to my TalentQL pipeline task",
        data: null,
      })
    );
    res.end();
  } else if (req.url == "/api/v1/validate" && req.method === "POST") {
    if (validateAuth(req, res) !== null) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          code: 401,
          status: "fail",
          message: "authorization token is required",
        })
      );
    }
    payment(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "fail",
        message: "Requested resource not found",
      })
    );
  }
};
