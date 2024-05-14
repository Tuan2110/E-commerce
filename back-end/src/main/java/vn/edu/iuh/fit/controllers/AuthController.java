package vn.edu.iuh.fit.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.event.RegistrationCompleteEvent;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.models.VerificationToken;
import vn.edu.iuh.fit.repositories.VerificationTokenRepository;
import vn.edu.iuh.fit.requests.LoginRequest;
import vn.edu.iuh.fit.requests.UserRequest;
import vn.edu.iuh.fit.responses.ApiResponse;
import vn.edu.iuh.fit.responses.LoginResponse;
import vn.edu.iuh.fit.services.ICartService;
import vn.edu.iuh.fit.services.IUserService;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IUserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository verificationTokenRepository;
    private final ICartService cartService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody UserRequest userRequest, BindingResult result,final HttpServletRequest request) {
        ApiResponse response = new ApiResponse();
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            response.setMessage(errorMessages.toString());
            return ResponseEntity.badRequest().body(response);
        }
        if (!userRequest.getPassword().equals(userRequest.getConfirmPassword())) {
            response.setMessage("Password and Confirm Password do not match");
            return ResponseEntity.badRequest().body(response);
        }
        try {
            User user = userService.createUser(userRequest);
            cartService.createCart(user);
            // publish registration event
            publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request)));

            response.setMessage("User registered successfully.Please verify your email to activate your account");
            response.setStatus(true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping("/verifyEmail")
    public ResponseEntity<ApiResponse> verifyEmail(@RequestParam("token") String token) {
        VerificationToken verifyToken = verificationTokenRepository.findByToken(token);
        if(verifyToken.getUser().isActive()) {
            return ResponseEntity.badRequest().body(ApiResponse.builder()
                    .message("Email already verified")
                    .status(false)
                    .build());
        }
        boolean verificationResult = userService.validateToken(token);
        if(verificationResult) {
            return ResponseEntity.ok(ApiResponse.builder()
                    .message("Email verified successfully.Now you can login to your account")
                    .status(true)
                    .build());
        }
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .message("Invalid token")
                .status(false)
                .build());
    }

    private String applicationUrl(HttpServletRequest request) {
        System.out.println("http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath());
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword(),
                    loginRequest.getRoleId() == null ? 1 : loginRequest.getRoleId()
            );
            return ResponseEntity.ok(LoginResponse.builder()
                    .message("Login successfully")
                    .token(token)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(e.getMessage())
                            .build()
            );
        }
    }

}
