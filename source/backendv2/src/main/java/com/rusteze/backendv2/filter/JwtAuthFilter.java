package com.rusteze.backendv2.filter;

import com.rusteze.backendv2.auth.JwtService;
import com.rusteze.backendv2.models.User;
import com.rusteze.backendv2.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain
    ) throws ServletException, IOException {

        String token = extractTokenFromCookie(request);

        if (token != null && jwtService.isValid(token)) {
            UUID userId = jwtService.extractUserId(token);
            Optional<User> user = userRepository.findById(userId);

            if (user.isPresent()) {
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(user.get(), null, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        chain.doFilter(request, response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
            .filter(c -> "jwt".equals(c.getName()))
            .map(Cookie::getValue)
            .findFirst()
            .orElse(null);
    }
}
