export class User {
  constructor(username, email, password, profilePicture) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.profilePicture = profilePicture;
    this.createdAt = new Date();
  }
}
