package edu.ap.be.backend.controller;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    int randomServerPort;
    @Autowired
    UserRepository userRepository;
    @InjectMocks
    UserController userController;
    @Test
    @DisplayName("Verkrijg gebruiker doormiddel van ID")
    void getUserByID() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        Optional<User> user = userRepository.findById(160L);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, user, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    @DisplayName("Bewerk een gebruiker")
    void updateUser() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        User user = userRepository.findById(160L).get();
        user.setEnabled(false);
        user.setEmail("mock@updated.mock.test");
        user.setFirstName("Mock");
        user.setLastName("Updated");
        user.setVat("No Vat Here");
        userRepository.save(user);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, user, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    @DisplayName("Verwijder een gebruiker")
    void deleteUser() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        User user = userRepository.findById(160L).get();
        userRepository.delete(user);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, user, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }
}