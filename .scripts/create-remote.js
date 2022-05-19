const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const shell = require('shelljs');
const minimist = require('minimist');

// git clone https://github.com/cfryerdev/microfrontends-remote-react-typescript
// remove .git folder
// replace all instances of {REPLACE_NAME} with appname
// replace all instances of {REPLACE_PORT} with port
// run npm i
// Add to pnmp-workspaces.yaml
// Add name and local host port to /host/.env
// Create a route and lazy load new remote by name
// Add start and install commands to package.json

/* ================================================= */

const { appname, port } = minimist(process.argv.slice(2));
const apppath = `remotes/${appname}`;
process.chdir('../');

/* ================================================= */

const updateWorkspaces = () => {};

const cloneRemoteTemplate = () => {
    shell.config.silent = true;
    shell.cd(apppath)
    shell.exec('git clone https://github.com/cfryerdev/microfrontends-remote-react-typescript .');
    shell.exec('rm -r .git');
};

const updatePackageJson = () => {

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

console.log('Finished!');