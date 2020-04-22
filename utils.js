const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error("Expected an array");
  return arr[Math.floor(Math.random() * arr.length)];
};

const createId = (quotes, quote) => {
  const higherIdQuote = quotes.reduce((a, b) => {
    if (a.id < b.id) {
      return b;
    } else {
      return a;
    }
  });
  return (quote.id = higherIdQuote.id + 1);
};

module.exports = {
  getRandomElement,
  createId
};
