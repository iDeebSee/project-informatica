package edu.ap.be.backend.controller;
import edu.ap.be.backend.models.Sector;
import edu.ap.be.backend.repository.SectorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SectorControllerTest {

    @LocalServerPort
    int randomServerPort;
    @Autowired
    SectorRepository sectorRepository;
    @InjectMocks
    SectorController sectorController;
    @Test
    @DisplayName("Sector aanmaken.")
    void createSector() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        Sector sector = new Sector();
        sector.setNaam("Test");
        sector.setIsBlack(false);
        sector.setNACEcode("7327");
        sectorRepository.save(sector);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, sector, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    @DisplayName("Een sector updaten")
    void updateSector() throws URISyntaxException {

        RestTemplate restTemplate = new RestTemplate();
        List<Sector> sectorList = sectorRepository.findAll();
        Sector sector = sectorList.get(0);
        sector.setNaam("updated sector test");
        sectorRepository.save(sector);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, sector, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    @DisplayName("Een sector verwijderen.")
    void deleteSector() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();
        List<Sector> sectorList = sectorRepository.findAll();
        Sector sector = sectorList.get(0);
        sectorRepository.delete(sector);
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/sector";
        URI uri = new URI(baseUrl);
        ResponseEntity<String> result = restTemplate.postForEntity(uri, sector, String.class);
        assertEquals(200, result.getStatusCodeValue());
    }
}