export type MUIDropDownList = {
  id: string;
  label: string;
  firstLetter?: string;
};

interface Mapper<T, U> {
  (data: T): U;
}

export function ListMapper<T, U>(
  mapperFunction: Mapper<T, U>
): (data: T[]) => U[] {
  return (data: T[]): U[] => {
    if (data) return data.map(mapperFunction);
    return [];
  };
}
