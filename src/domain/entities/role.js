class Role {
  constructor (id, name, code, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.created_at = createdAt;
    this.updated_at = updatedAt;

    Object.seal(this); // prevent properties from being added or removed from the object.
  }
}

export default Role;
