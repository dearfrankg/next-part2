const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./mock/data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/search/repositories": "/items",
    "/search/repositories/:id": "/items/:id"
  })
);

router.render = (req, res) => {
  res.jsonp({
    items: res.locals.data
  });
};

server.use(router);

server.listen(3333, () => {
  console.log("JSON Server is running");
});
