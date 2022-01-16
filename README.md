> Para la documentación de desarrollador, dirigirse a la carpeta `docs`

#TODO:
- Pipelines
- Babel
- Script gestión de plugins por fichero
  - Obtendrá los plugins y sus versiones, generando un archivo con ambos datos.
  - Realizará la instalación de los mismos mediante WP CLI
  - También se podrán instalar mediante ZIP almacenado en el repo
- Script que actualice plugins (usando anterior comando), media files y/o base de datos a elección
- XDEBUG (desde docker y desde devcontainer)
- ¿[Migraciones](https://github.com/cakephp/phinx) de BD?
- Licencia


# TO DOC:
- Documentación en carpeta aparte
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

# Comandos
- Sacar JSON de plugins: `dcom run cli plugin list --format=json --status=active --fields=name,version > plugins.json`
- Lint PHP: `dcom -f docker-compose-tools.yaml run php8 ./wordpress/vendor/bin/phpcs --standard=phpcs.xml $(git ls-files --exclude-standard | grep ".php")`
- Lint JS: `dcom run npm run js:lint`
