const isNullOrEmpty = (value) => {
  return value === null || value === undefined || value === '';
};

const getOffset = (page, limit) => {
  return (page - 1) * limit;
};

module.exports = {
  isNullOrEmpty,
  getOffset,
};
