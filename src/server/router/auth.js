export function auth(req, res, next) {
  console.log('auth', req.session);

  if (!req.session.username) {
    return next(new Error("oh no")) // handle error
  }
  if (req.session.view) {
    req.session.view++;
  } else {
    req.session.view = 1;
  }
  next() // otherwise continue
}
