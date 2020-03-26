const config = {
  locales: {
    availables: process.env.LOCALES,
  },
};

export const clean = () => ({
  ...config,
});

export default config;
