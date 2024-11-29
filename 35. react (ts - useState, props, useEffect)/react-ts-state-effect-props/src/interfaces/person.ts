import Id from "../types/id.ts";

export interface Person {
  id: Id;
  name: string;
  age: number;
  isMarried: boolean;
}
