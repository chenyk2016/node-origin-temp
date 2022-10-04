// 登录用户的数据
const user = {
  prefix: 'user:',
  defaultUser: {
    name: '',
    password: '',
  },
  async add (uid, {
    name,
    password,
  }) {
    await client.set(`${this.prefix}${uid}`, {
      name,
      password,
    });
  },
  async get(uid) {
    await client.get(`${prefix}${uid}`);
  },
  async update(uid, name) {
    const info = await this.get(uid);
    if (!info) {
      throw new Error('用户不存在');
    }
    await client.set(`${this.prefix}${uid}`, {
      ...info,
      name,
    });
  },
}