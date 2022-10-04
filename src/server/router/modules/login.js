export function login (req, res) {
  const { username, password } = req.query;

  if (username && password === "123") {
    req.session.username = username;
    if (req.session.view) {
      req.session.view++;
    } else {
      req.session.view = 1;
    }
    req.session.save();
    res.send('登录成功');
  } else {
    res.send('用户名或密码错误');
  }
}

export function logout (req, res) {
  req.session.destroy(() => {
    res.send("登出成功");
  });
}
