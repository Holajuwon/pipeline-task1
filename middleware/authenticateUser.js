/**
 * validates authorization token
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns error message or null
 */

exports.validateAuth = (req, res) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return "authorization token is required";
  }
  return null;
};
