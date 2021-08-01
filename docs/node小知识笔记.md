# node小知识

## readFile讲文件读成字符串

```js
fs.readFile(path.join(__dirname, '../build/index.html'), 'utf8', function(err, data) {
  if (err) throw err;
  shtml = data;
});
```
