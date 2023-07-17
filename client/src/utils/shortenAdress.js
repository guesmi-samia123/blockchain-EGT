export const ShortenAddress = (address) => {
    if (address && address.length >= 9) {
      return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
    }
    return address; // return the original address if it doesn't meet the condition
  };
