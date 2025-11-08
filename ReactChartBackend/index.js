// server.js
import jsonServer from "json-server";
import { nanoid } from "nanoid";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/transactions",(req,res,next)=>{
  if(!req.body.id){
    req.body.id = nanoid();
  }
  next();
});

server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/transactions") {
    const { date, amount } = req.body;
    if (!date || typeof amount !== "number") {
      return res.status(400).json({ error: "Date and amount are required" });
    }
  }
  next();
});

server.use(router);

const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
