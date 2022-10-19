# BCR - Car Management API (OpenAPI 3.0)

API to manage Binar Car Rental service website. This API is a part of fullstack development course individual project by Binar Academy.  
  
User is divided into three roles: superadmin, admin, member.  

Superadmin default account details can be found [here](#about-superadmin-account). Superadmin account details can also be modified by following the instruction there.

## Setup Server

    npm install

To install all dependencies needed to run this server.  
Next is to configure server settings. All settings are avaliable on `config` directories. All configuration files are listed below:

| Filename | Details |
|--|--|
| cloudinary.js | Cloudinary account secrets and upload picture folder target |
| database.js | PostgreSQL database account and database details for Sequelize |
| superadmin.js | Superadmin account data for seeder |
| server.js | Server configuration, change server port here only if you really have to. *will need to change server properties in `docs/openapi.json` to use OpenAPI Swagger UI if this is changed. |
| routes.js  | API routes configuration. *Avoid editing this unless you know what you are doing. |
| upload.js | Multer configuration. *Avoid editing this unless you know what you are doing. |

After configuration is done, run the following command to complete server setup with one command:

    npm run setup

If there is problem with the one-line command you can run this set of commands instead:

    sequelize db:drop
    sequelize db:create
    sequelize db:migrate
    sequelize db:seed:all

Rerun either of these commands to fresh reset the server database.

## About Superadmin Account

Superadmin account can access all endpoint in the API and create more admin account. Default superadmin account are configured like this:

    name: Mr.Superadmin
    email: super@admin.com
    password: admin

To change the default account details, the configuration files are available on `config/superadmin.js`. To apply changes to superadmin account configuration, run the following one-line command:

    npm run superadmin

If there is problem with the one-line command you can run this set of commands instead:
    
    sequelize db:seed:undo
    sequelize db:seed:all

*Note that by running either one of these commands you will be removing all prior superadmin account and adding one new superadmin account based on the current superadmin configuration.  
**Running this above commands is SAFE and can be done repeatedly because it will NOT delete all the other user accounts that doesn't have superadmin role assigned.

## Run Server

To run the server in normal mode, run the following command:

    npm start

To run the server in development mode, run the following command instead:

    npm run develop

Server will run at `http://localhost:8000` by default.

## API Documentation

API documentation is available in two different formats:

| Documentation type | Link | Details |
|--|--|--|
| OpenAPI Swagger UI | http://localhost:8000 | Swagger UI based on `docs/openapi.json` file. Can be accessed after running the server. |
| Static Documentation | [Here](/docs) | Markdown file documentation |

Authentication and authorization system used are `token-based auth`.

## Database Design

Database model design can be represented by the following diagram:

![erd image](/docs/erd.png)

