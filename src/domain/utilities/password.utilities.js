import bcrypt from 'bcryptjs';

const saltRounds = 10;

class PasswordUtility {

    static encryptPassword(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    static comparePasswords(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

}

export default PasswordUtility;
