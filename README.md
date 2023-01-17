# Express API Starter

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Setup

```
npm install
```

## Development

```
npm run dev
```

## Production

```
npm run start
```

## Folder structure
```
root/
├─ node_modules/
├─ server/
│  ├─ api/
│  │  ├─ routes/
│  │  │  ├─ users.routes.js
│  │  ├─ users/
│  │  │  ├─ users.controller.js
│  │  ├─ dao/
│  │  │  ├─ users.DAO.js
│  ├─ config/
│  │  ├─ server.js
│  ├─ validation/
│  │  ├─ userValidation.js
├─ index.js
├─ package.json
├─ .gitignore
