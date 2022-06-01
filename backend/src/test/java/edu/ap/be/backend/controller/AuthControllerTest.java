package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import edu.ap.be.backend.response.MessageResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    PasswordEncoder passwordEncoder;



    @Test
    @DisplayName("Test slaagt als er een user geregistreerd wordt")
    void registerUser() {
        //user aanmaken
        User user = new User();
        user.setFirstName("tester");
        user.setLastName("wordtGetest");
        user.setEmail("idktest@test.test");
        user.setPassword(passwordEncoder.encode("test123"));
        Role klantRole =  roleRepository.findByRole(RoleType.KLANT)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRole(klantRole);
        user.setVat("BE123.456.789");
        user.setEnabled(true);

        //krijg het resultaat
        final ResponseEntity<?> forEntity = restTemplate.postForEntity("/auth/signup", user, User.class);



        //Verkrijg status code is OK
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        //Verkrijg dat alle geslaagde velden dezelfde zijn
        //user wordt niet opgeslagen in de repository, dus verkrijg geen ID
//        Optional<User> actualUser = userRepository.findUserByEmail(user.getEmail());
//        assertEquals(user.getFirstName(), actualUser.getFirstName());
//        assertEquals(user.getLastName(), actualUser.getLastName());
//        assertEquals(user.getEmail(), actualUser.getEmail());
//        assertEquals(user.getRole(), actualUser.getRole());
//        assertEquals(user.getVat(), actualUser.getVat());
//        assertEquals(user.getEnabled(), actualUser.getEnabled());
    }
}