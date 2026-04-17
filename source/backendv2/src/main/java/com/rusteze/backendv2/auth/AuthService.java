package com.rusteze.backendv2.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.rusteze.backendv2.models.User;
import com.rusteze.backendv2.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final GoogleIdTokenVerifier verifier;

    public AuthService(
        UserRepository userRepository,
        @Value("${google.client-id}") String googleClientId
    ) {
        this.userRepository = userRepository;
        this.verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            GsonFactory.getDefaultInstance()
        ).setAudience(Collections.singletonList(googleClientId)).build();
    }

    public User verifyAndUpsert(String idToken) throws Exception {
        GoogleIdToken token = verifier.verify(idToken);
        if (token == null) {
            throw new IllegalArgumentException("Invalid Google ID token");
        }

        GoogleIdToken.Payload payload = token.getPayload();
        String providerId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        Optional<User> existingUser = userRepository.findByProviderAndProviderId("google", providerId);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setLastLoginAt(Instant.now());
            return userRepository.save(user);
        } else {
            User user = new User();
            user.setProvider("google");
            user.setProviderId(providerId);
            user.setEmail(email);
            user.setName(name);
            return userRepository.save(user);
        }
    }
}
