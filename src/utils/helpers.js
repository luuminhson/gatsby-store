export const debounce = (delay, fn) => {
  let timeout;

  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
};

export const cutDescriptionShort = (desc, limit) => {
  if (desc.length > limit) {
    return `${desc.slice(0, limit).trim()}...`;
  }

  return desc;
};

export const priceWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
