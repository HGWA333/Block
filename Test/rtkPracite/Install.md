```sh
yarn create react-app ./~
```

```sh
npm install @reduxjs/toolkit@beta @reduxjs/toolkit@beta-rtk-query
```

```sh
yarn add @reduxjs/toolkit@beta @reduxjs/toolkit@beta-rtk-query
```

```sh
yarn add express dotenv express-session cookie-parser morgan styled-components react-router-dom mysql2 sequelize axios cors
```

```sh
yarn add -D npm-run-all nodemon sequelize-cli
```

```sh
npx sequelize init   # 서버 폴더에서 실행
```

```json
  "scripts": {
    "start": "npm-run-all --parallel start:**",
    "start:server": "nodemon ./server",
    "start:client": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

```js
BUILD_PATH = "./server/build";
COOKIE_SECRET = "test";
```
