const Ship = (length) => {
  let hits = 0;
  return {
    hit() {
      if (hits < length) hits += 1;
      return hits;
    },
    isSunk() {
      return hits >= length;
    },
    getHits() {
      return hits;
    },
  };
};

export default Ship;
