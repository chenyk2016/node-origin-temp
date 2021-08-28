# node项目从0-1

## 运行环境

1. 安装node
2. 修改配置

```bash
├── .env.local  # 启动端口配置
└── public   # 模拟数据
    ├── certificate # 放置https证书
    └── download # 放置需要下载的文件
```

## 开发

```bash
npm install

npm run start
```

## 部署

```bash
npm install

# 启动
npm run prod

## 重启
npm run prod:restart

## 停止

npm run prod:stop
```

## 目录说明

## 创建项目

```bash
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

> <https://nodejs.org/en/docs/guides/getting-started-guide/>

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

## openssl自制 Https 证书

>参考1: <https://www.jianshu.com/p/a9497de4cbff>
>参考2:<https://stackoverflow.com/questions/58802767/no-proceed-anyway-option-on-neterr-cert-invalid-in-chrome-on-macos>

key是服务器上的私钥文件，用于对发送给客户端数据的加密，以及对从客户端接收到数据的解密

csr是证书签名请求文件，用于提交给证书颁发机构（CA）对证书签名

crt是由证书颁发机构（CA）签名后的证书，或者是开发者自签名的证书，包含证书持有人的信息，持有人的公钥，以及签署者的签名等信息

生成RSA私钥

    openssl genrsa -des3 -out server.key 2048

生成crt证书

  openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \
    -new \
    -out server.crt \
    -subj /CN=test \
    -extensions v3_new \
    -config <(cat /etc/ssl/openssl.cnf \
    <(printf '[v3_new]\nsubjectAltName=DNS:app.chen.com\nextendedKeyUsage=serverAuth')) \
    -sha256 \
    -days 3650

## node支持import/export

### 方法1

require('@babel/register')

### 方法2

> 此方法， module-alias 不生效。不知原因

```bash
npm i esm
```

package.json配置script

```bash
NODE_ENV=development node -r esm ./src/server/index.js
```

## node配置alias别名

```bash
npm install module-alias
```

```json
"_moduleAliases": {
  "@": "src"
}
```

## TODO

- host修改立即生效的方法
- express全局错误不生效了 2021/02/28
