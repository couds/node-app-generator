import Database from 'services/database';

export default {
  getOne: async () => {
    const [result] = await Database.query();
    return result;
  },
  find: () => {
    return Database.query();
  },
};
