import express, { Request, Response } from "express";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import HealthController from "./controllers/health";
import VersionController from "./controllers/version";
import RemotesController from "./controllers/remotes";

import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;

(async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(VersionController);
    app.use(HealthController);
    app.use(RemotesController);
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}/api-docs/`);
    });
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();