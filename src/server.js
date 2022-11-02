import mongoose from "mongoose";
// ("dotenv").config();
import app from "./app"
import http from "http";


//mongoose connection
mongoose.connect("mongodb://localhost:27017/NFT-Task");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error) => {
    console.log("error is:", error);
  });

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, (req, res) => {
  console.log(`its running on port: ${PORT}`);
});
