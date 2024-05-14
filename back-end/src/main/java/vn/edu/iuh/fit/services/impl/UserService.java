package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.Role;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.models.VerificationToken;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.VerificationTokenRepository;
import vn.edu.iuh.fit.requests.UserRequest;
import vn.edu.iuh.fit.services.IUserService;
import vn.edu.iuh.fit.utils.JwtTokenUtil;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public void save(User user) {
        userRepository.save(user);
    }
    @Override
    @Transactional
    public User createUser(UserRequest userRequest) throws UserException {
        String email = userRequest.getEmail();
        if(userRepository.existsByEmail(email)) {
            throw new UserException("Email already exists: " + email);
        }
        Role role = roleRepository.findById(userRequest.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role does not exist"));
        if(role.getName().toUpperCase().equals(Role.ADMIN)) {
            throw new RuntimeException("Cannot register Admin account");
        }
        if(!userRequest.getPassword().equals(userRequest.getConfirmPassword())){
            throw new RuntimeException("Password and Confirm Password do not match");
        }
        User newUser = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .facebookAccountId(userRequest.getFacebookAccountId())
                .googleAccountId(userRequest.getGoogleAccountId())
                .active(false)
                .build();
        newUser.setRole(role);

        if (userRequest.getFacebookAccountId() == 0 && userRequest.getGoogleAccountId() == 0) {
            String password = userRequest.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String email, String password,Long roleId) throws UserException {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new UserException("Email or password is incorrect");
        }
        User existingUser = user.get();
        if (existingUser.getFacebookAccountId() == 0 && existingUser.getGoogleAccountId() == 0) {
            if (!passwordEncoder.matches(password, existingUser.getPassword())) {
                throw new UserException("Email or password is incorrect");
            }
        }
        if(!existingUser.isActive()) {
            throw new UserException("Your account has not been verified or is locked");
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password,
                existingUser.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(user.get());
    }

    @Override
    public User getUserFromToken(String token) {
        token = token.substring(7);
        System.out.println(token);
        String email = jwtTokenUtil.extractEmail(token);
        System.out.println(email);
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void saveUserVerificationToken(User user, String token) {
        var verificationToken = new VerificationToken(token,user);
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public boolean validateToken(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if(verificationToken == null) {
            return false;
        }
        User user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if(verificationToken.getExpirationTime().getTime() - calendar.getTime().getTime() <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return false;
        }
        user.setActive(true);
        userRepository.save(user);
        return true;
    }

    @Override
    public User findUserById(Long id) throws UserException {
        return userRepository.findById(id).orElseThrow(() -> new UserException("User not found with id: " + id));
    }
}
