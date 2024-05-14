package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.requests.UserRequest;

public interface IUserService {
    User createUser(UserRequest userRequest) throws UserException;
    String login(String email, String password,Long roleId) throws UserException;

    User getUserFromToken(String token);
    void saveUserVerificationToken(User user, String verificationToken);
    boolean validateToken(String token);
    User findUserById(Long id) throws UserException;
}
