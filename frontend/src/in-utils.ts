// I mean, they're not worthless or in-util (in pt-BR "inutil" means worthless. but they're not I swear).
// Just didn't found a better place to put it. yet.
/**
 * do a conversion of
 * @param value
 * @param fromUnit
 * @param toUnit
 * @returns
 */
export function convertDigitalUnit(
  value: number,
  fromUnit: string,
  toUnit: string
): string {
  const units: { [key: string]: number } = {
    b: 1,
    kb: 1024,
    mb: 1024 ** 2,
    gb: 1024 ** 3,
    tb: 1024 ** 4,
    pb: 1024 ** 5,
    eb: 1024 ** 6,
    zb: 1024 ** 7,
    yb: 1024 ** 8,
  };

  if (
    !units.hasOwnProperty(fromUnit.toLowerCase()) ||
    !units.hasOwnProperty(toUnit.toLowerCase())
  ) {
    throw new Error("Invalid unit");
  }

  const result =
    (value * units[fromUnit.toLowerCase()]) / units[toUnit.toLowerCase()];

  return `${result}${toUnit}`;
}
