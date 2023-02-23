import UserDTO from '../DTOs/user.dto.js';

class UserMapper {
  toDTO (user) {
    return new UserDTO(user.email, user.password);
  }

  toEntity (userDTO) {
    return {
      id: userDTO.id,
      email: userDTO.email,
      password: userDTO.password,
      createdAt: userDTO.created_at,
      updatedAt: userDTO.updated_at,
      uuid: userDTO.uuid,
      disabled: userDTO.disabled
    };
  }
}

export default UserMapper;
