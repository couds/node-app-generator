const dummyService = {
  random: (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min),
};

export default dummyService;
