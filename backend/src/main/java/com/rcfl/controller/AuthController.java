package com.rcfl.controller;

import com.rcfl.entity.User;
import com.rcfl.repository.UserRepository;
import com.rcfl.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // SIGN UP
    // =========================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {

        String fullName = request.get("fullName");
        String email = request.get("email");
        String phone = request.get("phone");
        String password = request.get("password");

        if (fullName == null || email == null || password == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(password)); // 🔐 hash
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // =========================
    // LOGIN + JWT
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // ✅ Generate JWT
        String token = JwtUtil.generateToken(user.getEmail(), user.getRole());

        // ✅ Send to frontend
        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "email", user.getEmail(),
                        "role", user.getRole()
                )
        );
    }
}
