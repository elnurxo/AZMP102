export function checkLocal(key) {
  const check = Boolean(localStorage.getItem(key));
  return check;
}
