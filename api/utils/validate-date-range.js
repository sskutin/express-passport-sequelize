const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const validateDateRange = ({ fromDate, toDate }) => {
  const fromTime = new Date(fromDate).getTime();
  const toTime = new Date(toDate).getTime();

  if (toTime - fromTime > ONE_YEAR_MS) {
    return false;
  }

  return true;
};

module.exports = validateDateRange;
