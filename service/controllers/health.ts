import express, { Request, Response } from "express";
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *    get:
 *      tags:
 *        - Health
 *      summary: Determines if the service is in a healthy state
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: The service is in a healthy state
 */
router.get("/api/health/", (_: Request, res: Response) =>
    res.send({ message: "The service is operating correctly." })
);

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoint
 */
export default router;