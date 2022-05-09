package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.Sector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import edu.ap.be.backend.repository.SectorRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/sector")
public class SectorController {
    
    
    @Autowired
    SectorRepository sectorRepository;


    
    @GetMapping("")
    public List<Sector> getAllSectors() {
        return sectorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sector> getKredietAanvraagByID(@PathVariable(value = "id") long sectorID)
            throws ResourceNotFoundException {
        Sector sector = sectorRepository.findById(sectorID)
                .orElseThrow(() -> new ResourceNotFoundException("sector not found for this id :: " + sectorID));
        System.out.println(sectorRepository.findById(sectorID).toString());
        return ResponseEntity.ok().body(sector);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @PostMapping("")
    public Sector createSector(@Validated @RequestBody Sector sector) {
        return sectorRepository.save(sector);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR') or hasRole('KLANT')")
    @PutMapping("/{id}")
    public ResponseEntity<Sector> updateSector(@PathVariable(value = "id") long sectorID,
            @Validated @RequestBody Sector sectorDetails) throws ResourceNotFoundException {
        Sector sector = sectorRepository.findById(sectorID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + sectorID));

        sector.setNaam(sectorDetails.getNaam());
        sector.setNasiCode(sectorDetails.getNasiCode());
        sector.setIsBlack(sectorDetails.getIsBlack());


       
        

        final Sector updateSector = sectorRepository.save(sector);
        return ResponseEntity.ok(updateSector);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteSector(@PathVariable(value = "id") long sectorID)
            throws ResourceNotFoundException {
        Sector sector = sectorRepository.findById(sectorID)
                .orElseThrow(() -> new ResourceNotFoundException("sector not found for this id :: " + sectorID));

        sectorRepository.delete(sector);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
