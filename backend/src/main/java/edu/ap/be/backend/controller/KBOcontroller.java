package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.KBO;
import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Root;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kbo")
public class KBOcontroller {
    @Autowired
    private KBOrepository KBOrepository;

   

    // @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or
    // hasRole('KREDIETBEOORDELAAR')")
    @GetMapping("")
    public List<KBO> getAllOndernemingen() {
        return KBOrepository.findAll();
    }

    @GetMapping("/{vat}")
    public ResponseEntity<KBO> getKBOByID(@PathVariable(value = "vat") String vat) throws ResourceNotFoundException {
        KBO kbo = KBOrepository.findKBOByvat(vat)
                .orElseThrow(() -> new ResourceNotFoundException("kbo not found for this vat :: " + vat));
        return ResponseEntity.ok().body(kbo);
    }

    @PostMapping("")
    public KBO createOnderneming(@Validated @RequestBody KBO ond) {
       

        return KBOrepository.save(ond);
    }

  

    

}
