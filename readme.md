# Tild

## Starting the project

- To start the project, you just need to run the `docker-compose` command to spin up the container:

```bash
❯ docker compose up
```

### ⚠️ Important ⚠️

- In the backend directory, you need to run the migrations. This will create the database and the first system Administrator user, and a few more as example. [Please, read the migration](./backend/src/database/migrations/1684548100898-MigrationIndexZeroUser.ts).

```bash
  ❯ cd backend
  ❯ ./npm-run.sh migration:run
```

## Database

- In the development environment, to start a NEW instance of the database, you must first remove the container volume to ensure that the initialization script will be executed:

  - The first time the `docker compose` is run, there is no need to remove the volume because the database does not exist yet. The container will execute the initialization script present in the database initialization directory.
  - Which, in turn, executes the `pgsql_dump.sql` file with the initial database DDL.

    > `database/docker-entrypoint-initdb.d/init-user-db.sh`

```bash
  ❯ docker volume rm tild_psql-data
  ❯ sudo rm -rf database/psql-data # if the docker command didn't work
```

## Migrations

- Running the migrations.

```bash
  ❯ ./npm-run.sh migration:run
```

### Development

- To generate migrations based on the application Entities, run the following command after defining the entire entity.

```bash
  ❯ ./npm-run.sh migration:generate --name=<migration_name>
```

## Helpers

- This project includes a script for running `npm` commands inside the backend container, where the first argument is the `npm` command to be executed, and the second parameter is additional arguments for the command.

```bash
  ❯ ./npm-run.sh <npm run commands> $1 $2
```

- Input:

> `./npm-run.sh migration:generate --name=User`

- Output:

> `npm run build && npx typeorm -d dist/database/datasource.config.js migration:generate src/database/migrations/User`

- So you could also create your own command to run in the backend container.

```json
  "my_own_command": "run command...", package.json
```

```bash
  ❯ ./npm-run.sh my_own_command`
```

- You could use the `cross-vars` variables as `$npm_config_name`.

## Accessing the project

- After that, to access the system, go to: <http://localhost>

## Documentation

- The project documentation is automated using the Swagger tool.
  - <http://localhost:3420/docs>
