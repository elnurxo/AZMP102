import Id from "./id";

export type ProductType = {
  id?: Id;
  name: string;
  price: number;
  isDiscounted: boolean;
};
