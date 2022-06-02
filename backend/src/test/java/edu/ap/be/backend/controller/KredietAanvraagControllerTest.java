package edu.ap.be.backend.controller;

import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KredietAanvraagControllerTest {

    @LocalServerPort
    int randomServerPort;

    @Mock
    KredietaanvraagRepository kredietaanvraagRepository;

    @InjectMocks
    KredietAanvraagController kredietAanvraagController;


    @Test
    void getKredietAanvraagByuserID() {

    }

    @Test
    void createKredietAanvraag() {
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