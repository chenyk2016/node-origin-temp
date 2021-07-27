# node项目从0-1

## 创建项目

```py

# 初始化git仓库，添加.gitignore文件
git init

# 初始化node项目
npm init
```

## 配置eslint

```zsh
npm install eslint --save-dev

./node_modules/.bin/eslint --init
```

~~## 让node可以使用import/export~~

## 开启node服务器

http

> https://nodejs.org/en/docs/guides/getting-started-guide/

## 配置package.json启动项目

```json
"server": "node ./index.js"
```

## 使用express

```cli
npm i -s express
```

## 链接mysql数据库

```cli
npm install mysql -s
```

## 读取excel

```cli
npm install excel node-xlsx

```

## 配置热更新

```cli
npm install --save-dev nodemon
```

## 配置读取环境变量dotenv

  npn install dotenv

## 生产环境部署: pm2

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "server": "node ./src/server/index.js",
  "start": "nodemon --exec 'npm run server'",
  "prod": "NODE_ENV=production pm2 start --name node_origin_temp ./src/server/index.js",
  "restart:app": "pm2 restart node_origin_temp"
}
```

## TODO
