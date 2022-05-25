const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const shell = require('shelljs');
const minimist = require('minimist');

const githubrepo = "https://github.com/cfryerdev/microfrontends-remote-react-typescript";

// run npm i
// Add name and local host port to /host/.env
// Create a route and lazy load new remote by name
// Add start and install commands to package.json

/* ================================================= */

const { appname, port } = minimist(process.argv.slice(2));
const apppath = `remotes/${appname}`;
process.chdir('../');

/* ================================================= */

// const updateWorkspaces = () => {
//     const filePath = `../../package.json`;
//     const packageJsonData = fs.readFileSync(filePath, 'utf-8');
//     const packageJson = JSON.parse(packageJsonData);
//     if (!packageJson.workspaces.includes(apppath)) {
//         packageJson.workspaces.push(apppath);
//     }
//     fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2), 'utf-8');
// };

const updateWorkspaces = () => {
    const filePath = `../pnpm-workspace.yaml`;
    const workspaceData = fs.readFileSync(filePath, 'utf-8');
    const workspace = yaml.load(workspaceData);
    if (!workspace.packages.includes(`remotes/${remotename}`)) {
        workspace.packages.push(`remotes/${remotename}`);
    }
    const data = yaml.dump(workspace);
    fs.writeFileSync(filePath, data, 'utf-8');
};


const updateTypescriptPaths = () => {
    const filePath = `../../tsconfig.json`;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(raw);
    const ref = jsonData.references.filter(ref=> ref.path === `./${apppath}`);
    if (ref === null || ref === undefined || ref.length === 0) {
        jsonData.references.push({ path: `./${apppath}` });
    }
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
};

const cloneRemoteTemplate = () => {
    shell.config.silent = true;
    shell.cd(apppath)
    shell.exec(`git clone ${githubrepo} .`);
    shell.exec('rm -r .git');
};

const executeReplaceVariables = () => {
    let files  = [];
    const readFilesFromDirectory = (directoryName) => {
        fs.readdirSync(directoryName).forEach(file => {
            const abs = path.join(directoryName, file);
            if (fs.statSync(abs).isDirectory()) return readFilesFromDirectory(abs);
            else return files.push(abs);
        });
    };
    readFilesFromDirectory(`${__dirname}/../${apppath}`);
    files.forEach(file => { 
        fs.readFile(file, 'utf8', (err, data) => { 
            if (!err) {
                var result = data
                    .replace(/{REPLACE_NAME}/g, appname)
                    .replace(/{REPLACE_PORT}/g, port);
                fs.writeFile(file, result, 'utf8', (_) => { });
            }
        });
    });
};

const validateRemoteName = () => {
    return /[A-Za-z0-9]/.test(appname);
};

const safeCreateDirectory = () => {
    if (!fs.existsSync(apppath)){
        fs.mkdirSync(apppath);
    }
};

/* ================================================= */

if (!appname || !port) {
    console.error("You must supply the [name] and [port] flags to use this tool.");
    process.exit(1);
}

if (!validateRemoteName(appname)) {
    console.error("You must supply a valid [appname] flag eg [^(a-z_A-Z)].");
    process.exit(1);
}

/* ================================================= */

console.log('Starting ...');

console.log(`-- Creating remote directory...`);
safeCreateDirectory(`/remotes/${appname}`);

console.log(`-- Cloning remote template...`);
cloneRemoteTemplate();

console.log(`-- Updating remote template name and port...`);
executeReplaceVariables();

console.log(`-- Updating npm workspaces...`);
updateWorkspaces();

console.log(`-- Updating tsconfig refrences...`);
updateTypescriptPaths();

console.log('Finished!');