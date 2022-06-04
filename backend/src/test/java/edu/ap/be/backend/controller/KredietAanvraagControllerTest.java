package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.*;
import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KredietAanvraagControllerTest {

    @LocalServerPort
    int randomServerPort;

    @Mock
    KredietaanvraagRepository kredietaanvraagRepository;

    @Mock
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @InjectMocks
    KredietAanvraagController kredietAanvraagController;



    @BeforeEach
    void aanmakenVanUser(){
        User user = new User();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("John@Doe.test");
        user.setPassword("test123");
        user.setVat("TST123.456.789");

        Role klantRole = roleRepository.findByRole(RoleType.KLANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRole(klantRole);
        user.setEnabled(true);

        userRepository.save(user);

    }

    @Test
    @DisplayName("Aanmaken van een kredietaanvraag")
    void createKredietAanvraag() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        Kredietaanvraag kredietaanvraag=new Kredietaanvraag();
        kredietaanvraag.setId(0L);
        kredietaanvraag.setNaam("Test Unit");
        kredietaanvraag.setLooptijd(2);
        kredietaanvraag.setLening(10000);
        kredietaanvraag.setCategorie(Categorie.KLEINMATERIEEL);
        kredietaanvraag.setEigenVermogen(1000);

        kredietaanvraag.setUserID(2L);

        kredietaanvraagRepository.save(kredietaanvraag);

        final String baseUrl = "http://localhost:"+randomServerPort+"/kredietaanvragen";
        URI uri = new URI(baseUrl);

        assertNotEquals(null, kredietaanvraag);





        ResponseEntity<String> result = restTemplate.postForEntity(uri, kredietaanvraag, String.class);
//        assertEquals(200, result.getStatusCodeValue());
        assertNotEquals(null, result );
    }

    @Test
    void getKredietAanvraagByuserID() {
//        Kredietaanvraag kredietaanvraag = kredietaanvraagRepository.getById();
//        assertTrue(kboList.size() >= 0);

    }



    @Test
    void updateKredietAanvraag() {
    }

    @Test
    void deleteKredietAanvraag() {
    }

    @Test
    void updateKredietAanvraagStatus() {

    }
}