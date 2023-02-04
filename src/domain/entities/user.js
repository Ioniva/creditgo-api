class User {
  constructor (id, email, password, created_at, updated_at, uuid) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.uuid = uuid;

    Object.seal(this); // prevent properties from being added or removed from the object.
  }
}

export default User;
