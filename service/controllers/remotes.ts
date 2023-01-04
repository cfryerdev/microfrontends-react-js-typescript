import express, { Request, Response } from "express";
const router = express.Router();

const fetchRemoteFromEnv = (text) => {
    var remoteUrl = process.env[`REMOTE_${text.toUpperCase()}`];
    return remoteUrl ? remoteUrl : null;
}

const setTitleCasing = (text) => {
    return text.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
        return txt.charAt(0)
            .toUpperCase() + txt.substr(1)
                .toLowerCase();
    });
};

const setRemoteModuleName = (text) => {
    return text
        .toLocaleLowerCase()
        .replace(' ', '_')
        .replace('-', '');
};

const getRemotesFromConfiguration = () => {
    let obj = [];
    var remotes = Object.entries(process.env);
    remotes.forEach((rem) => {
        var scope = rem[0].toLowerCase();
        if (scope.startsWith('remote_')) {
            var url = rem[1];
            var name = scope.replace('remote_', '');
            obj.push({ name, scope, url });
        }
    });
    return obj;
};

/**
 * @swagger
 * /api/remotes:
 *    get:
 *      tags:
 *        - Remotes
 *      summary: Current application remotes available to load.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Remotes endpoint list to be replaced with a config service
 */
router.get("/api/remotes", (req: Request, res: Response) => {
    return res.send(getRemotesFromConfiguration())
});

/**
 * @swagger
 * /api/remotes/{remoteName}:
 *    get:
 *      tags:
 *        - Remotes
 *      summary: Reads application remote details available to load.
 *      parameters:
 *          - name: remoteName
 *            description: Name of the remote
 *            in: path
 *            required: true
 *            type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Remotes endpoint data to be replaced with a config service
 */
router.get("/api/remotes/:remoteName", (req: Request, res: Response) => {
    return res.send({
        key: `Remote:${setTitleCasing(req.params.remoteName)}`,
        moduleName: `remote_${setRemoteModuleName(req.params.remoteName)}`,
        value: fetchRemoteFromEnv(req.params.remoteName),
    })
});

/**
 * @swagger
 * tags:
 *   - name: Remotes
 *     description: Remotes configuration endpoints
 */
export default router;