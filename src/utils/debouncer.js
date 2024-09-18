function debouncer(delay) {
  let timeout;
  return function (exec) {
    clearTimeout(timeout);
    timeout = setTimeout(exec, delay);
  };
}

export default { debouncer } = debouncer(500);
