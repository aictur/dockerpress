> Para la documentación de desarrollador, dirigirse a la carpeta `docs`

# TODO:
- Documentación en carpeta a parte
  - Instalación y uso
    - Instalación del entorno con docker
    - Uso de los scripts de docker
    - Uso de los scripts custom
    - Configuración del email
    - Habilitar stylelint en phpstorm e instalarlo en vscode
  - Logs
  - Debug
  - Crear y desarrollar tema
  - Crear y desarrollar plugin
  - Pipelines
  - Linting
    - [SCSS](https://stylelint.io/user-guide/rules/list/)
- Documentación raíz (Este readme)
  - Instalación inicial
  - Renombrar tema (cambiar path scripts npm y archivos php)
- Pipelines
- Boilerplate de tema
- Boilerplate de plugin (posible webpack)
- Ejecución [concurrente](https://www.npmjs.com/package/concurrently) de webpack
- ESLint
- PHP CS
- Script gestión de plugins por fichero
  - Obtendrá los plugins y sus versiones, generando un archivo con ambos datos.
  - Realizará la instalación de los mismos mediante WP CLI
  - También se podrán instalar mediante ZIP almacenado en el repo
- Encriptado y desencriptado de `wp-config` con GPG
- Script que actualice plugins (usando anterior comando), media files y/o base de datos a elección
- XDEBUG
- ¿[Migraciones](https://github.com/cakephp/phinx) de BD?
- Licencia


# Comandos
- Sacar JSON de plugins: `dcom run cli plugin list --format=json --status=active --fields=name,version > plugins.json`
- Lint PHP: `dcom -f docker-compose-tools.yaml run php8 ./wordpress/vendor/bin/phpcs --standard=phpcs.xml $(git ls-files --exclude-standard | grep ".php")`
