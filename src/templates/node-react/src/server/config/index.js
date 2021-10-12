const config = {
  locales: {
    availables: (process.env.LOCALES || '').split(','),
  },
  seo: {
    title: 'project__name__',
    description: '',
  },
};

export const clean = () => {
  return {
    ...config,
  };
};

export default config;
