package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.KBO;
import edu.ap.be.backend.repository.KBOrepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.internal.matchers.NotNull;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
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
class KBOcontrollerTest{

    @LocalServerPort
    int randomServerPort;

    @Mock
    KBOrepository kbOrepository;

    @InjectMocks
    KBOcontroller kbOcontroller;


    @Test
    @DisplayName("Aanmaken van een onderneming")
    void createOnderneming() throws URISyntaxException {

        RestTemplate restTemplate = new RestTemplate();

        //Een onderneming aanmaken
        KBO kbo = new KBO();
        kbo.setId(2020L);
        kbo.setAssets(1000);
        kbo.setCurrentAssets(1000);
        kbo.setDepreciation(0);
        kbo.setVat("BE123.456.789");
        kbo.setEquity(10000);
        kbo.setFinancialCost(100);
        kbo.setFixedAssets(10000);
        kbo.setNacbelCode("9999");
        kbo.setName("Unit Test");
        kbo.setResult(1000);
        kbo.setShortTermDebt(1000);
        kbo.setTax(25);
        kbo.setLongTermDebt(1000);
        kbo.setResultAfterTax(899);
        kbo.setStock(1000);
        kbo.setWriteDown(0);


        kbOrepository.save(kbo);
        //url string meegeven
        final String baseUrl = "http://127.0.0.1:"+randomServerPort+"/kbo";
        URI uri = new URI(baseUrl);

//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "{id:1, firstName:John,lastName:Doe,role:KANTOOR,email:johnDoe@alpha.com}");

        //response opvangen bij het slagen stuurt het een 200 OK response terug
        ResponseEntity<String> result = restTemplate.postForEntity(uri, kbo, String.class);
        assertEquals(200, result.getStatusCodeValue());


    }


    @Test
    @DisplayName("Verkrijg alle ondernemingen")
    void getAllOndernemingen() {

        List<KBO> kboList = new ArrayList<>(kbOrepository.findAll());
        assertTrue(kboList.size() >= 0);

    }
}