const config = {
  locales: {
    availables: (process.env.LOCALES || '').split(','),
  },
  seo: {
    title: 'project__name__',
    description: '',
  }
};

export const clean = () => ({
  ...config,
});

export default config;
