import { nanoid } from "nanoid";

class User {
  constructor(
    name,
    email,
    password,
    address,
    profileImage,
    isSeller = false,
    basketItems = []
  ) {
    this.id = nanoid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.createdAt = new Date();
    this.profileImage = profileImage;
    this.isSeller = isSeller;
    this.basketItems = basketItems;
  }
}

export default User;
