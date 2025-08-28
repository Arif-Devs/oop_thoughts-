import app from "@/app";
import http from "http";

import './lib/db/DatabaseClientPool'

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server linting on port ${port}`);
});
