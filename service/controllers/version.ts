import express, { Request, Response } from "express";
import packageJson from "../../package.json";
const router = express.Router();

/**
 * @swagger
 * /api/version:
 *    get:
 *      tags:
 *        - Version
 *      summary: Current application version
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: The currently deployed version from package.json
 */
router.get("/api/version/", (_: Request, res: Response) =>
    res.send(packageJson.version)
);

/**
 * @swagger
 * tags:
 *   - name: Version
 *     description: Version information endpoint
 */
export default router;