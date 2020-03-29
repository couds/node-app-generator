const config = {
  locales: {
    availables: (process.env.LOCALES || '').split(','),
  },
};

export const clean = () => ({
  ...config,
});

export default config;
