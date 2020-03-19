### API Node Template project

*NOTE*: This is a Work in progress.

This is a proposal for a way to organize your api projects.

In this structure you will notice a lot of `index.js` files, the idea is to **always** import the folder instead of a file like

```
import Database from 'services/database'
```

This way its easier when the project grows. let's say we create a `service/database.js` file instead of the folder, if/when the content of this file grows and need to be separated on several files you could end with something like 

```
service
  -- database.js
  -- database-mongo.js
  -- database-mysql.js
  -- ...other-services...
```

## Guidelines

- File names are kebab-case
- Variable names are camelCase
- Modules should be a folder with an `index.js` that expose the module and an `[module-name].js` that contain all the login. (you can also have folders inside following the same rule). This is no a Hard rule and can be broken depending of the case (like in `services/middlewares/my-custom-middleware.js`, this file is not likely to grow so I left it as a file)

## Structure

As usual your entry point is `src/index.js`

```
src
  -- enpoints
    -- v1
    -- v2
    ...
  -- services
    -- middlewares (For your express middlewares if any)
    -- database (Here you export your database connection)
    -- repositories (Here you expose your repositories/model that will be used on your routes, replace the current folders for your logic)
    -- dummy (DELETE)
```

## Troubleshooting

### Webpack fail to pack

- If you are using a library that webpack can't pack, add it as an external dependency and install it in the final docker image