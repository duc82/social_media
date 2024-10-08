"use client";

const debounce = <T extends any[]>(
  func: (..._args: T) => void,
  wait: number
) => {
  /* global NodeJS */
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default debounce;
