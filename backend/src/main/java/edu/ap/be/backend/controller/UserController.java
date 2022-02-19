package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.ResourceNotFoundException;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable(value = "id") int userID) throws ResourceNotFoundException {
            User employee = userRepository.findById(userID)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));

                    System.out.println(userRepository.findById(userID).toString());
            return ResponseEntity.ok().body(employee);

    }
}
