import User from '../../domain/entities/user.js';

class UserDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    };
}

export default UserDTO;
