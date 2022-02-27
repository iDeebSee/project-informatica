package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.payload.LoginRequest;
import edu.ap.be.backend.payload.SignupRequest;
import edu.ap.be.backend.repository.RoleRepository;
import edu.ap.be.backend.repository.UserRepository;
import edu.ap.be.backend.response.JwtResponse;
import edu.ap.be.backend.response.MessageResponse;
import edu.ap.be.backend.security.jwt.JwtUtils;
import edu.ap.be.backend.security.service.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        String role = userDetails.getAuthority().toString();
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                role));
    }

    @PreAuthorize("hasRole('ADMININISTRATOR') or hasRole('KANTOOR') or hasRole('KREDIETBEOORDELAAR')")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
        List<String> strRoles = new ArrayList<>();
        strRoles.add(signUpRequest.getRole());
        Role roles = new Role();
        if (strRoles == null) {
            RoleType userRole = roleRepository.findByRole(RoleType.KLANT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.setRole(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        RoleType adminRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "kantoor":
                        RoleType kantoorRole = roleRepository.findByRole(RoleType.KANTOOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(kantoorRole);
                        break;
                    case "comdirectie":
                        RoleType comdirectieRole = roleRepository.findByRole(RoleType.COMDIRECTIE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(comdirectieRole);
                        break;
                    case "compliance":
                        RoleType complianceRole = roleRepository.findByRole(RoleType.COMPLIANCE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(complianceRole);
                        break;
                    case "sustainability":
                        RoleType sustainablityRole = roleRepository.findByRole(RoleType.SUSTAINABILITY)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(sustainablityRole);
                        break;
                    case "kredietbeoordelaar":
                        RoleType kredietbeoordelaarRole = roleRepository.findByRole(RoleType.KREDIETBEOORDELAAR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(kredietbeoordelaarRole);
                        break;
                    default:
                        RoleType userRole = roleRepository.findByRole(RoleType.KLANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRole(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
