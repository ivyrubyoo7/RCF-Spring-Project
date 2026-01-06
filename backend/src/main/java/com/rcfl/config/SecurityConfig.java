package com.rcfl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF (REST API)
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors -> {})

                // Stateless session (JWT style)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Disable default login
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Allow preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Allow auth APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // ✅ TEMP: allow assets API
                        .requestMatchers("/api/assets/**").permitAll()

                        // Everything else secured
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
