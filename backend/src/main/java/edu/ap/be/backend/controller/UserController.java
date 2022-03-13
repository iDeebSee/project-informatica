package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
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
        System.out.println(userDetails.getEmail());
        user.setLastName(userDetails.getLastName());
        user.setFirstName(userDetails.getFirstName());
        if (userDetails.getPassword() != "" || userDetails.getPassword() != null) {
            user.setPassword(encoder.encode((userDetails.getPassword())));
            System.out.println(userDetails.getPassword());
            System.out.println(encoder.encode(userDetails.getPassword()));
        }
        // switch (userDetails.getRole().toString().toLowerCase()) {
        //     case "administrator":
        //         Role adminRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(adminRole);
        //         //roles.add(adminRole);
        //         break;
        //     case "klant":
        //         Role klantRole = roleRepository.findByRole(RoleType.KLANT)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(klantRole);
        //         //roles.add(adminRole);
        //         break;
        //     case "kantoor":
        //         Role kantoorRole = roleRepository.findByRole(RoleType.KANTOOR)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(kantoorRole);
        //         //roles.add(kantoorRole);
        //         break;
        //     case "comdirectie":
        //         Role comdirectieRole = roleRepository.findByRole(RoleType.COMDIRECTIE)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(comdirectieRole);
        //         //roles.add(comdirectieRole);
        //         break;
        //     case "compliance":
        //         Role complianceRole = roleRepository.findByRole(RoleType.COMPLIANCE)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(complianceRole);
        //         //roles.add(complianceRole);
        //         break;
        //     case "sustainability":
        //         Role sustainablityRole = roleRepository.findByRole(RoleType.SUSTAINABILITY)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(sustainablityRole);
        //         //roles.add(sustainablityRole);
        //         break;
        //     case "kredietbeoordelaar":
        //         Role kredietbeoordelaarRole = roleRepository.findByRole(RoleType.KREDIETBEOORDELAAR)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(kredietbeoordelaarRole);
        //         //roles.add(kredietbeoordelaarRole);
        //         break;
        //     default:
        //         Role userRole = roleRepository.findByRole(RoleType.KLANT)
        //                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        //         user.setRole(userRole);
        // }
        //user.setRole(userDetails.getRole());

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
