class User {
  constructor (id, email, password, createdAt, updatedAt, uuid) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
    this.uuid = uuid;

    Object.seal(this); // prevent properties from being added or removed from the object.
  }
}

export default User;
