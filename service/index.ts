import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import HealthController from "./controllers/health";
import VersionController from "./controllers/version";

const port = process.env.PORT || 3010;

(async () => {
  try {
    const app = express();

    app.use(bodyParser.json());

    app.use(VersionController);
    app.use(HealthController);
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(express.static('public'));

    app.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}/api-docs/`);
    });
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();