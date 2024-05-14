package vn.edu.iuh.fit.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import vn.edu.iuh.fit.filters.JwtTokenFilter;

import java.util.List;

import static org.springframework.http.HttpMethod.GET;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests.requestMatchers(
                                String.format("%s/auth/register", apiPrefix),
                                String.format("%s/auth/login", apiPrefix),
                                String.format("%s/auth/verifyEmail", apiPrefix)
                        ).permitAll()
                            .requestMatchers(GET,
                                    String.format("%s/products/**", apiPrefix)
                            ).permitAll()
                        .anyRequest().authenticated();
                })
                .oauth2Login(oauth2->{
                    oauth2.loginPage("/login").permitAll()
                            .successHandler(oAuth2LoginSuccessHandler);
                })
                .build();
    }
}
