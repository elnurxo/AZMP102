export class Singer {
  constructor(
    stageName,
    realName,
    age,
    debutYear,
    img,
    awardsWon,
    labelCompany,
    genres,
    nationality,
    albums,
    monthlyListeners
  ) {
    this.stageName = stageName;
    this.realName = realName;
    this.age = Number(age);
    this.debutYear = Number(new Date(debutYear).getFullYear());
    this.img = img;
    this.awardsWon = awardsWon;
    this.labelCompany = labelCompany;
    this.genre = genres.join(",");
    this.nationality = nationality;
    this.albums = albums;
    this.monthlyListeners = Number(monthlyListeners);
  }
}
