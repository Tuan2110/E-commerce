package vn.edu.iuh.fit.configs;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.services.impl.UserService;
import vn.edu.iuh.fit.utils.JwtTokenUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    @Value("${front-end.url}")
    private String frontEndUrl;
    private final RoleRepository roleRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException, ServletException, IOException {
        OAuth2AuthenticationToken oauth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        String clientName = oauth2AuthenticationToken.getAuthorizedClientRegistrationId();
        if(clientName.equals("google")){
            login(response, oauth2AuthenticationToken, clientName, "sub");
        }else if(clientName.equals("facebook")){
            login(response, oauth2AuthenticationToken, clientName, "id");
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontEndUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
    public void login(HttpServletResponse response,
                    OAuth2AuthenticationToken oauth2AuthenticationToken,String clientName,String keyName){
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) oauth2AuthenticationToken.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = attributes.getOrDefault("email","").toString();
        String name = attributes.getOrDefault("name","").toString();
        userService.findByEmail(email).
                ifPresentOrElse(user ->{
                    try {
                        sendToken(user, attributes, keyName, clientName, response);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }, ()-> {
                    User user = User.builder().role(roleRepository.findById(1l).get())
                            .email(email)
                            .firstName(name)
                            .lastName("")
                            .facebookAccountId(0)
                            .googleAccountId(0)
                            .active(true)
                            .build();
                    userService.save(user);
                    try {
                        sendToken(user, attributes, keyName, clientName, response);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
    }
    public void sendToken(User user, Map<String, Object> attributes, String keyName, String clientName, HttpServletResponse response) throws IOException {
        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().getName())),attributes,keyName);
        Authentication auth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName().toUpperCase())), clientName);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtTokenUtil.generateToken(user);
        response.sendRedirect(frontEndUrl + "?token=" + token);
    }
}
