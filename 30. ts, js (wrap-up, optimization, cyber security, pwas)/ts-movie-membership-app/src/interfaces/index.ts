import { MovieGenre } from "../enums/index.ts";

export interface IMovie {
  id: string | number;
  title: string;
  director: string;
  releaseYear: number;
  genre: MovieGenre;
}

export interface IPremiumMember {
  name: string;
  membershipStart: Date;
  isActive: boolean;
  frozen: boolean;
  freezeMembership(): boolean;
  unfreezeMembership(): boolean;
  getMembershipDuration(): number;
}
