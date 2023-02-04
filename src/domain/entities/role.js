class Role {
  constructor (id, name, code, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.created_at = created_at;
    this.updated_at = updated_at;

    Object.seal(this); // prevent properties from being added or removed from the object.
  }
}

export default Role;
