import { nanoid } from "nanoid";

class User {
  constructor(username, email, password) {
    this.id = nanoid();
    this.email = email;
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.balance = 0;
    this.profileImage =
      "https://i.pinimg.com/736x/06/3b/bf/063bbf0665eaf9c1730bccdc5c8af1b2.jpg";
    this.role = "client";
    this.profileImagePublicId = null;
    this.isBanned = false;
    this.basket = [];
  }
}

export default User;
