package com.rusteze.backendv2.auth;

import com.rusteze.backendv2.models.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(
        @RequestBody Map<String, String> body,
        HttpServletResponse response
    ) {
        String idToken = body.get("idToken");
        if (idToken == null || idToken.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "idToken is required"));
        }

        try {
            User user = authService.verifyAndUpsert(idToken);
            String jwt = jwtService.generate(user.getId());

            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
            response.addCookie(cookie);

            return ResponseEntity.ok(toDto(user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Authentication failed"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(toDto(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    private Map<String, Object> toDto(User user) {
        return Map.of(
            "id", user.getId(),
            "email", user.getEmail(),
            "name", user.getName() != null ? user.getName() : ""
        );
    }
}
