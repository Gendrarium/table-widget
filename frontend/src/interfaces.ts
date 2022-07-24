export interface ITableRow {
  id: number;
  name: string;
  date: string;
  amount: number;
  distance: number;
}

export interface IValue<T = string> {
  [index: string]: T;
}
