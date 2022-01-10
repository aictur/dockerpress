const argv = require('minimist')(process.argv.slice(2));
const { resolve, dirname } = require('path');
const { readdir } = require('fs').promises;
const {exec} = require('child_process');
const util = require('util');
const { spawn } = require('child_process');


async function* findPackages(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* findPackages(res);
        } else if (res.endsWith('/package.json') && !res.includes('node_modules/')) {
            yield res;
        }
    }
}

function runCommand(path, command) {
    const ls = spawn('npm', command.split(' '), {cwd: path});

    ls.stdout.on('data', (data) => {
        console.log(`${path}: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`${path}: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`${path} exited with code ${code}`);
    });
    ls.on('error', (code) => {
        console.log(`${path} exited with code ${code}`);
    });
}

const command = argv._[0];

;(async () => {
    for await (const module of findPackages('./src')) {
        const module_folder = dirname(module);
        const {scripts} = require(module);

        if (command === 'install' || argv._[1] in scripts) {
            runCommand(module_folder, argv._.join(" "));
        }

    }
})();
