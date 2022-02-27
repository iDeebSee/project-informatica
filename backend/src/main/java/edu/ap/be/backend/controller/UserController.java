package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    //BCrypt bCrypt = new BCrypt();

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable(value = "id") long userID) throws ResourceNotFoundException {
            User employee = userRepository.findById(userID)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));
                    System.out.println(userRepository.findById(userID).toString());
            return ResponseEntity.ok().body(employee);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @PostMapping("")
    public User createUser(@Validated @RequestBody User user) {
        return userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR') or hasRole('KLANT')")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") long userID,
                                           @Validated @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));

        user.setEmail(userDetails.getEmail());
        user.setLastName(userDetails.getLastName());
        user.setFirstName(userDetails.getFirstName());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());

        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") long userID)
            throws ResourceNotFoundException {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userID));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
