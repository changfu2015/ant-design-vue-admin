export function getCurrentAuthority() {
  // 模范接口返回用户权限(用户权限，管理者权限)
  // ['user','admin']
  return ['admin'];
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest';
}
