const error = (message = 'Default Error', code = 500) => {
  const e = new Error(message);
  e.statusCode = code;
  e.stack = e.stack
    .split('\n')
    .filter((_, i) => i !== 1)
    .join('\n');

  throw e;
};

export default error;
