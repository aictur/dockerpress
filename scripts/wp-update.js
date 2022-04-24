const argv = require('minimist')(process.argv.slice(2));
const YAML = require('yaml');
const fs = require('fs');
const {spawn} = require("child_process");
(async () => {
    if (argv._.length < 2 || Object.keys(argv).length < 2 || argv.h || argv.help) {
        console.log("Copia en paralelo (o síncrono con --sync) los media files y/o base de datos de un entorno a otro\n")
        console.log("wp-update <source> <dest> [--database] [--media] [--sync]")
        console.log("\t-d --database\t\tDescarga la BD")
        console.log("\t-m --media\t\tDescarga la carpeta uploads de WP")
        console.log("\t--sync\t\t\tEjecuta de forma síncrona los comandos")
    }

    // @TODO: Si es de local a remoto imprimir warning
    // @TODO: Fix ejecucion en contenedor
    // @TODO: Comprobar que existen ssh, mysql-client, sshpass y rsync
    // @TODO: Parchear el dominio

    const copyDatabase = !!(argv.d || argv.database);
    const copyMedia = !!(argv.m || argv.media);
    const source = argv._[0];
    const dest = argv._[1];
    const synchronously = !!argv.sync;

    if (fs.existsSync('./wordpress.yaml')) {
        const file = fs.readFileSync('./wordpress.yaml', 'utf8');
        const config = YAML.parse(file);

        if (copyDatabase) {

            // Datos de la BD origen
            const {
                user: dbSourceUser,
                password: dbSourcePassword,
                database: dbSourceDatabase,
            } = config.environments[source].database;
            let dbSourceHost = config.environments[source].database.host ?? '127.0.0.1';

            // Datos de la BD destino
            const {
                user: dbDestUser,
                password: dbDestPassword,
                database: dbDestDatabase,
            } = config.environments[dest].database;
            let dbDestHost = config.environments[dest].database.host ?? '127.0.0.1';

            // Componemos los comandos base
            let dumpCommand = `mysqldump -u ${dbSourceUser} ${dbSourcePassword ? '-p' + dbSourcePassword : ''} -h ${dbSourceHost} ${dbSourceDatabase}`;
            let importCommand = `mysql -h ${dbDestHost} -u ${dbDestUser} ${dbDestPassword ? '-p' + dbDestPassword : ''} ${dbDestDatabase}`;

            // Manejamos el tunel del origen si existe
            if (config.environments[source].database.tunnel) {
                const {
                    host: sshHost,
                    user: sshUser,
                    port: sshPort,
                    password: sshPassword
                } = config.ssh[config.environments[source].database.tunnel];

                let prefix = '';

                if (sshPassword) {
                    prefix = 'sshpass -p ' + sshPassword + ' ';
                }

                prefix += `ssh -o StrictHostKeyChecking=no -p ${sshPort} ${sshUser}@${sshHost}`;

                dumpCommand = prefix + ' ' + dumpCommand;
            }

            // Manejamos el tunel del destino si existe
            if (config.environments[dest].database.tunnel) {
                const {
                    host: sshHost,
                    user: sshUser,
                    port: sshPort,
                    password: sshPassword
                } = config.ssh[config.environments[dest].database.tunnel];

                let prefix = '';

                if (sshPassword) {
                    prefix = 'sshpass -p ' + sshPassword + ' ';
                }

                prefix += `ssh -o StrictHostKeyChecking=no -p ${sshPort} ${sshUser}@${sshHost}`;

                importCommand = prefix + ' ' + importCommand;
            }

            console.log("Importando DB");
            const cmdFunction = () => runCommand(dumpCommand + ' | ' + importCommand)
                .then(() => console.log('DB Importada'));

            if (synchronously) {
                await cmdFunction();
            } else {
                cmdFunction();
            }
        }

        if (copyMedia) {
            console.log('Descargando media files');

            const sourceSSH = config.environments[source].ssh;
            const destSSH = config.environments[dest].ssh;

            let commandPrefix = "";
            let sourceParam = "";
            let destParam = "";
            let port = 22;

            // Si ninguno de los entornos es local, añadir conexión por ssh
            if (sourceSSH && destSSH) {
                const {
                    host: sourceHost,
                    user: sourceUser,
                    password: sourcePassword,
                    port: sourcePort
                } = config.ssh[sourceSSH];

                if (sourcePassword) {
                    commandPrefix = 'sshpass -p ' + sourcePassword + ' ';
                }
                commandPrefix += `ssh -o StrictHostKeyChecking=no -p ${sourcePort ?? port} ${sourceUser}@${sourceHost}`;

                // Seteamos el source path como path local del source al que nos hemos conectado por ssh
                sourceParam = config.environments[source].basePath;

                const {
                    host: destHost,
                    user: destUser,
                    password: destPassword,
                    port: destPort
                } = config.ssh[destSSH];
                port = destPort;
                destParam = `${destUser}@${destHost}:${config.environments[dest].basePath}`
                if (config.ssh[destSSH].password) {
                    commandPrefix = `${commandPrefix} sshpass -p ${config.ssh[destSSH].password}`
                }

            } else if(sourceSSH) { // El origen es el ssh
                if (config.ssh[sourceSSH] && config.ssh[sourceSSH].password) {
                    commandPrefix = `${commandPrefix} sshpass -p ${config.ssh[sourceSSH].password}`
                }
                const {
                    host: sourceHost,
                    user: sourceUser,
                    // password: sourcePassword,
                    port: sourcePort
                } = config.ssh[sourceSSH];
                sourceParam = `${sourceUser}@${sourceHost}:${config.environments[source].basePath}`;
                destParam = config.environments[dest].basePath;
                port = sourcePort;
            } else { // El destino es el ssh
                if (config.ssh[destSSH] && config.ssh[destSSH].password) {
                    commandPrefix = `${commandPrefix} sshpass -p ${config.ssh[destSSH].password}`
                }
                const {
                    host: destHost,
                    user: destUser,
                    // password: destPassword,
                    port: destPort
                } = config.ssh[destSSH];
                sourceParam = config.environments[source].basePath;
                destParam = `${destUser}@${destHost}:${config.environments[dest].basePath}`;
                port = destPort;
            }
            let command = `rsync -e "ssh -p ${port}" -rctauhLP ${sourceParam} ${destParam}`

            console.log('Ejecutando:', (commandPrefix + ' ' + command).trim());
            const cmdFunction = () => runCommand((commandPrefix + ' ' + command).trim())
                .then(() => console.log('DB Importada'));
            if (synchronously) {
                await cmdFunction();
            } else {
                cmdFunction();
            }
        }

    } else {
        console.log('El archivo wordpress.yaml no existe');
    }
})();

function runCommand(command) {
    return new Promise((resolve, reject) => {
        const ls = spawn('sh', ['-c', command]);

        ls.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        ls.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                console.log(`exited with code ${code}`);
                reject(code);
            }
        });

        ls.on('error', (code) => {
            console.log(`exited with code ${code}`);
            reject(code);
        });
    });
}
