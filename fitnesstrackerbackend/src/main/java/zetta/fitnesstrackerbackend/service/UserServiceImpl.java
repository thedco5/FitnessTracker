package zetta.fitnesstrackerbackend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import zetta.fitnesstrackerbackend.dto.user.UpdateUserDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.User;
import zetta.fitnesstrackerbackend.mapper.UserMapper;
import zetta.fitnesstrackerbackend.repository.ImageRepository;
import zetta.fitnesstrackerbackend.repository.UserRepository;
import zetta.fitnesstrackerbackend.vo.Gender;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ImageRepository imageRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.userMapper = userMapper;
    }

    @Override
    public ResponseEntity<String> createUser(UserDTO userDTO) {
        userDTO.setGender(
                null == userDTO.getGender()
                        ? Gender.OTHER
                        : userDTO.getGender()
        );
        userRepository.save(userMapper.toUserEntity(userDTO));
        return ResponseEntity.ok("Successfully signed up user!");
    }

    @Override
    @Transactional
    public UserDTO getUserInfo(UUID id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userMapper::toUserInfoDTO).orElse(null);
    }

    @Override
    public ResponseEntity<String> updateUserInfo(UpdateUserDTO userDTO, UUID id) {

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            return ResponseEntity.notFound().build();

        User user = optionalUser.get();
        user.setImage(null); // removes the image
        userRepository.save(user);

        userRepository.save(userMapper.updateUserInfoFromDTO(userDTO, user));
        return ResponseEntity.ok("Successfully updated user info!");

    }

}