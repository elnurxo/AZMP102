import Swal from "sweetalert2";
import { IMovie, IPremiumMember } from "../interfaces/index.ts";
import { MovieSort } from "../enums/index.ts";

export class PremiumMember implements IPremiumMember {
  public name: string;
  public membershipStart: Date;
  public isActive: boolean;
  public frozen: boolean;

  constructor(
    name: string,
    membershipStart: Date,
    isActive: boolean,
    frozen: boolean
  ) {
    this.name = name;
    this.membershipStart = membershipStart;
    this.isActive = isActive;
    this.frozen = frozen;
  }

  //methods implementation
  freezeMembership() {
    this.frozen = true;
    return this.frozen;
  }
  unfreezeMembership() {
    this.frozen = false;
    return this.frozen;
  }
  getMembershipDuration() {
    const memberShipDurationMS =
      new Date().getTime() - this.membershipStart.getTime();

    return memberShipDurationMS;
  }
}

export class MovieLibrary {
  public movies: IMovie[];
  public isLogged: boolean;

  constructor(movies: IMovie[]) {
    this.movies = movies;
    this.isLogged = false;
  }

  //methods
  addMovie(movie: IMovie, moviesList: HTMLUListElement): IMovie[] {
    //dom
    moviesList.innerHTML += `
         <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><b>${movie.title}</b>, ${movie.releaseYear} directed by <i>${movie.director}</i></span>
          <button data-id=${movie.id} class="btn btn-outline-danger">delete</button>
        </li>
    `;
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "movie added to library",
      showConfirmButton: false,
      timer: 1500,
    });
    this.movies.push(movie);
    return this.movies;
  }

  displayMovies(movies: IMovie[], list: HTMLUListElement) {
    list.innerHTML = "";
    movies.forEach((movie: IMovie) => {
      list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
       <span><b>${movie.title}</b>, ${movie.releaseYear} directed by <i>${movie.director}</i></span>
       <button data-id=${movie.id} class="btn btn-outline-danger">delete</button>
     </li>`;
    });
  }

  searchMoviesByTitle(title: string): IMovie[] {
    const searchedMovies: IMovie[] = this.movies.filter((movie: IMovie) => {
      return movie.title
        .toLowerCase()
        .trim()
        .includes(title.toLowerCase().trim());
    });

    return searchedMovies;
  }

  sortMoviesByYear(sort: string): IMovie[] {
    const sortedMovies = [
      ...this.movies.sort((movie1: IMovie, movie2: IMovie) => {
        const sortFor =
          sort === MovieSort.oldest
            ? movie1.releaseYear - movie2.releaseYear
            : movie2.releaseYear - movie1.releaseYear;
        return sortFor;
      }),
    ];

    return sortedMovies;
  }
}
