package edu.ap.be.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.Role;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    public RoleRepository roleRepository;
    @Autowired
    public UserRepository userRepository;

    @GetMapping("")
    public List<Role> getAllRoles() {
        System.out.println(roleRepository.findAll().toString());
        return roleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleByID(@PathVariable(value = "id") long userID)
            throws ResourceNotFoundException {
        Role role = userRepository.findById(userID).get().getRole();

        // System.out.println(role.toString());
        return ResponseEntity.ok().body(role);
    }

    public Role createRole(@Validated @RequestBody Role role) {
        return roleRepository.save(role);
    }

}
