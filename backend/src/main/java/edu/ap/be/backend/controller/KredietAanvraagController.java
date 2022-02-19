package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.Kredietaanvraag;
import edu.ap.be.backend.models.ResourceNotFoundException;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Kredietaanvraag> getKredietAanvraagByID(@PathVariable(value = "id") long kredietID) throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + kredietID));
        System.out.println(kredietRepository.findById(kredietID).toString());
        return ResponseEntity.ok().body(kredietaanvraag);
    }

    @PostMapping("")
    public Kredietaanvraag createKredietAanvraag(@Validated @RequestBody Kredietaanvraag krediet) {
        return kredietRepository.save(krediet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kredietaanvraag> updateKredietAanvraag(@PathVariable(value = "id") long kredietID,
                                           @Validated @RequestBody Kredietaanvraag kredietDetails) throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(() -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietaanvraag.setEigenVermogen(kredietDetails.getEigenVermogen());
        kredietaanvraag.setKlantID(kredietDetails.getKlantID());
        kredietaanvraag.setLening(kredietDetails.getLening());
        kredietaanvraag.setLooptijd(kredietDetails.getLooptijd());
        kredietaanvraag.setNaam(kredietDetails.getNaam());
        kredietaanvraag.setStatus(kredietaanvraag.getStatus());

        final Kredietaanvraag updatedKredietAanvraag = kredietRepository.save(kredietaanvraag);
        return ResponseEntity.ok(updatedKredietAanvraag);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteKredietAanvraag(@PathVariable(value = "id") long kredietID)
            throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(() -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietRepository.delete(kredietaanvraag);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
