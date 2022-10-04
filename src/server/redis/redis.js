import { createClient } from 'redis';
const session = require("express-session")
let RedisStore = require("connect-redis")(session)

const REDIS_CONNECT_MAX_TIMES = 10; // 连接redis服务器重试次数

class MyRedis {
  constructor ({
    onerror,
  } = {}) {
    this.client = null;
    this.onerror = onerror;
    this.reConnectTimes = 0;
    this.clientOk = false;
    this.session = null;
    return this;
  }

  async connect () {
    if (this.clientOk) {
      return true;
    }

    this.client = createClient({
      legacyMode: true,
      // url: redis[s]://[[username][:password]@][host][:port][/db-number]
    });

    this.client.on('error', (err) => {
      console.log('Redis Client Error', err)
    });
    this.client.on('ready', (err) => {
      this.clientOk = true;
      this.sessionInit();
    });

    await this.client.connect()
  }

  sessionInit() {
    this.session = session({
      store: new RedisStore({ client: this.client }),
      saveUninitialized: false,
      secret: "keyboard cat",
      name: 'node_s_session',
      resave: false,
      cookie: {
        maxAge: 60 * 1000, // 1分钟
      }
    })
  }

  useSession() {
    const that = this;
    return (req, res, next) => {
      that.session && that.session(req, res, next)
    }
  }
}

const myRedis = new MyRedis();

export default myRedis;
