const config = {
  db: {
    url: process.env.DB_URL || 'my-default-value',
  },
  version: process.env.VERSION || '0.0.0-unknow-version',
};

export default config;
