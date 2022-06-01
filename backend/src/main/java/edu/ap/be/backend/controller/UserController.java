package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
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
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    // @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or
    // hasRole('KREDIETBEOORDELAAR')")
    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable(value = "id") long userID) throws ResourceNotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));
        System.out.println(userRepository.findById(userID).toString());
        return ResponseEntity.ok().body(user);
    }


    public User createUser(@Validated @RequestBody User user) {
        if (user.getEnabled() == null) {
            user.setEnabled(true);
        }

        return userRepository.save(user);
    }


    public ResponseEntity<User> updateUser(@PathVariable(value = "id") long userID,
            @Validated @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));

        user.setEmail(userDetails.getEmail());
        // System.out.println(userDetails.getEmail());
        user.setLastName(userDetails.getLastName());
        user.setFirstName(userDetails.getFirstName());
        

        if (!(userDetails.getVat().equals("") || userDetails.getVat() == null)) {
            user.setVat(userDetails.getVat());
        }
        
        
        

        System.out.println("userdetails role: " + userDetails.getRole());

        for (Role rol : roleRepository.findAll()) {
            if (userDetails.getRole().getRole().equals(rol.getRole())) {
                user.setRole(rol);
            }
        }
        System.out.println("-------------  ENABLED STATUS: " + userDetails.getEnabled());
        user.setEnabled(userDetails.getEnabled());
        if (!(userDetails.getPassword().equals("") || userDetails.getPassword().equals(null))) {
            user.setPassword(encoder.encode((userDetails.getPassword())));
            System.out.println(userDetails.getPassword());
            System.out.println(encoder.encode(userDetails.getPassword()));
        }

        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }


    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") long userID)
            throws ResourceNotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    // @PutMapping("/status/{id}")
    // public ResponseEntity<User> updateUserActiveStatus(@PathVariable(value =
    // "id") long userID,
    // @Validated @RequestBody User userDetails) throws ResourceNotFoundException {
    // User user = userRepository.findById(userID)
    // .orElseThrow(() -> new ResourceNotFoundException("User not found for this id
    // :: " + userID));

    // if (user.getEnabled()) {
    // user.setEnabled(false);
    // } else {
    // user.setEnabled(true);

    // }
    // final User updatedUser = userRepository.save(user);
    // return ResponseEntity.ok(updatedUser);

    // }
}
