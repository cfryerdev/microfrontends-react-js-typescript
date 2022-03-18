import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import packageJson from "../../package.json";

const options = {
    explorer: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Microfrontends-bff',
        description: 'Reference Architecture using React, Typescript, and Module Federation',
        version: packageJson.version,
        contact: {
          name: "Chris Fryer",
          url: "http://www.cfryerdev.com/"
        },
      },
    },
    produces: ["application/json"],
    schemes: process.env.ENVIRONMENT === "dev" ? ["http"] : ["http", "https"],
    apis: [
      path.resolve(__dirname, "../controllers/*.ts"),
      path.resolve(__dirname, "../models/*.ts")
    ]
  };

  export default swaggerJsdoc(options);