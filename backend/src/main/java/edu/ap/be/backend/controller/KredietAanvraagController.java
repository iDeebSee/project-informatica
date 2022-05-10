package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.Kredietaanvraag;
import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kredietaanvragen")
public class KredietAanvraagController {
    @Autowired
    private KredietaanvraagRepository kredietRepository;

    @GetMapping("")
    public List<Kredietaanvraag> getAllKredietaanvragen() {
        System.out.println(kredietRepository.findAll().toString());
        return kredietRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kredietaanvraag> getKredietAanvraagByID(@PathVariable(value = "id") long kredietID)
            throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + kredietID));
        System.out.println(kredietRepository.findById(kredietID).toString());
        return ResponseEntity.ok().body(kredietaanvraag);
    }

    @GetMapping("/user/{id}")
    public List<Kredietaanvraag> getKredietAanvraagByuserID(@PathVariable(value = "id") long userID)
            throws ResourceNotFoundException {

                List<Kredietaanvraag> kredieten = new ArrayList<>();
                List<Kredietaanvraag> allKredietList = kredietRepository.findAll();
                for (Kredietaanvraag kred : allKredietList) {
                    if (kred.getUserID() == userID) {
                        kredieten.add(kred);
                    } 
                }

                return kredieten;        
    }

    @PostMapping("")
    public Kredietaanvraag createKredietAanvraag(@Validated @ModelAttribute Kredietaanvraag krediet) {
        return kredietRepository.save(krediet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kredietaanvraag> updateKredietAanvraag(@PathVariable(value = "id") long kredietID,
            @Validated @RequestBody Kredietaanvraag kredietDetails) throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietaanvraag.setEigenVermogen(kredietDetails.getEigenVermogen());
        kredietaanvraag.setUserID(kredietDetails.getUserID());
        kredietaanvraag.setLening(kredietDetails.getLening());
        kredietaanvraag.setLooptijd(kredietDetails.getLooptijd());
        kredietaanvraag.setNaam(kredietDetails.getNaam());
        kredietaanvraag.setStatus(kredietaanvraag.getStatus());
        kredietaanvraag.setCategorie(kredietaanvraag.getCategorie());

        final Kredietaanvraag updatedKredietAanvraag = kredietRepository.save(kredietaanvraag);
        return ResponseEntity.ok(updatedKredietAanvraag);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteKredietAanvraag(@PathVariable(value = "id") long kredietID)
            throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietRepository.delete(kredietaanvraag);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
