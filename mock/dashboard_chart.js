function chart(method) {
  let res = null;
  console.log(method);
  switch (method) {
    case 'GET':
      res = [20, 40, 30, 40, 70, 49];
      break;
    default:
      res = null;
  }
  return res;
}

// node 环境执行，需要commonjs 规范
module.exports = chart;
