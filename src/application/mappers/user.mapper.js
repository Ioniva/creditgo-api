import User from "../../domain/entities/user.js";
import UserDTO from "../DTOs/user.dto.js";

class UserMapper {

    toDTO(user) {
        return new UserDTO(user.email, user.password);
    }

    toEntity(userDTO) {
        return new User(
            userDTO.id,
            userDTO.email,
            userDTO.password,
            userDTO.created_at,
            userDTO.updated_at,
            userDTO.uuid
        );
    }

}

export default UserMapper;
