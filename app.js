import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";

const app = express();
import { config } from "dotenv";
config({ path: "./.env" });
import "./utils/db_connection.js";
const PORT = process.env.PORT;
import cors from "cors";
import { corsFunction } from "./utils/cors.js";
import production from "./utils/production.js";
import { swaggerUi } from "./utils/swagger.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const expressFileUpload = require("express-fileupload");
const swaggerJson = require('./swagger.json');

//routes
import userRoutes from "./routes/user.routes.js";
import candidateRoute from "./routes/candidate.routes.js";
import itemRoute from "./routes/item.routes.js";


app.use(cors());
app.use(corsFunction);
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
// app.use(expressFileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));
production(app);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(userRoutes);
app.use(candidateRoute);
app.use(itemRoute)


app.listen(process.env.PORT || PORT,'0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
