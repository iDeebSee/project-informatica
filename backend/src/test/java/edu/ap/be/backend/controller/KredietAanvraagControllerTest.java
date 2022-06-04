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

    @Autowired
    KredietaanvraagRepository kredietaanvraagRepository;

    @Mock
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @InjectMocks
    KredietAanvraagController kredietAanvraagController;


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
    @DisplayName("Verkrijg alle kredieten")
    void getAllKredietAanvragen(){
        List<Kredietaanvraag> kredietaanvraagList = new ArrayList<>(kredietaanvraagRepository.findAll());
        assertTrue(kredietaanvraagList.size() > 0);
    }

    @Test
    @DisplayName("Kredietaanvraag verkrijgen aan de hand van ID")
    void getKredietAanvraagByID() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        Kredietaanvraag kredietaanvraag = kredietaanvraagRepository.findById(199L).get();

        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/kredietaanvragen/";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.postForEntity(uri, kredietaanvraag, String.class);
        assertEquals(200, result.getStatusCodeValue());

    }



    @Test
    void updateKredietAanvraag() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        Kredietaanvraag kredietaanvraag = kredietaanvraagRepository.findById(199L).get();
        kredietaanvraag.setNaam("Geupdate Mock");

        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/kredietaanvragen";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.postForEntity(uri, kredietaanvraag, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    void deleteKredietAanvraag() {
    }

    @Test
    void updateKredietAanvraagStatus() {

    }
}