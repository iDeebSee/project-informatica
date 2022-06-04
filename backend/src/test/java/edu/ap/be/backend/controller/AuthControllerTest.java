package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    private static boolean setUpIsDone = false;

    @LocalServerPort
    int randomServerPort;

    @Autowired
    RoleRepository roleRepository;

    @Mock
    UserRepository userRepository;


    @Test
    @DisplayName("Een user registreren")
    void registerUser() {

        //user aanmaken
        User user = new User();
        user.setFirstName("Mock");
        user.setLastName("Data");
        user.setEmail("mock@data.test");
        user.setPassword("test123");
        user.setId(177L);
        Role adminRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRole(adminRole);

        user.setVat("BE123.456.789");
        user.setEnabled(true);
        User actual = userRepository.save(user);

        //een response entity aanmaken die de response opvangt.
        ResponseEntity<?> response = new ResponseEntity<>(actual, HttpStatus.OK);

        //testen of de controller een 200 (ok) status terug geeft.
        assertEquals(new ResponseEntity<>(HttpStatus.OK), response);

    }
}