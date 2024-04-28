export enum Currency {
  USD = "USD",
  EUR = "EUR",
  // GBP = "GBP",
  // JPY = "JPY",
  // RUB = "RUB",
  // CNY = "CNY",
  // KRW = "KRW",
  AUD = "AUD",
  // CAD = "CAD",
  // CHF = "CHF",
  // SEK = "SEK",
  NZD = "NZD",
  LKR = "LKR",
}

export const currencyArray = Object.keys(Currency).map(function (currency) {
  return Currency[currency as keyof typeof Currency];
});
