const argv = require('minimist')(process.argv.slice(2));

/**
 * plugin-install
 *
 *
 */
// Leer listado de plugins de WP
// Excluir plugins trackeados: git ls-files src/plugins | cut -d'/' -f3 | uniq
// Excluir plugins de la carpeta contenedora de ZIPs
// Instalar los plugins de la carpeta de ZIPs
// Activar todos los plugins
