const http = require("http");
const PORT = process.env.PORT || 5050;

const { route } = require("./routers/card");

/**
 * 
 */
const server = http.createServer(async (req, res) => {
  route(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT} 🚀`);
});
