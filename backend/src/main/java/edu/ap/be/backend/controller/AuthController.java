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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
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

        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            if (user.getEmail().equals(loginRequest.getEmail())) {
                if (user.getEnabled()) {
                    Authentication authentication = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                                    loginRequest.getPassword()));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    String jwt = jwtUtils.generateJwtToken(authentication);

                    UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
                    String role = userDetails.getAuthority().toString();
                    if (userDetails.isEnabled()) {
                        return ResponseEntity.ok(new JwtResponse(jwt,
                                userDetails.getId(),
                                userDetails.getEmail(),
                                role));
                    }
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    @GetMapping("/loggedin")
    public Authentication getLoggedUser(Authentication authentication) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())
                || userRepository.existsByVat(signUpRequest.getVat())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email of vat wordt al gebruikt!"));
        }
        // Create new user's account

        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getFirstName(), signUpRequest.getLastName());

        user.setEnabled(true);

        if (signUpRequest.getVat().equals("") || signUpRequest.getVat() == null || signUpRequest.getVat().equals(" ")){
            Random rand = new Random();
            user.setVat("Geen_Vat_Voor_Medewerkers-"+(UUID.randomUUID().toString()+rand.nextInt(Integer.MAX_VALUE)));
        }else{
            user.setVat(signUpRequest.getVat());
        }

        List<String> strRoles = new ArrayList<>();
        strRoles.add(signUpRequest.getRole());

        System.out.println(signUpRequest.getRole());
        System.out.println(signUpRequest.getEmail());
        System.out.println(signUpRequest.getPassword());

        if (strRoles == null) {
            Role userRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);

        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase(Locale.ROOT)) {
                    case "administrator":
                        Role adminRole = roleRepository.findByRole(RoleType.ADMINISTRATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(adminRole);
                        // roles.add(adminRole);
                        break;
                    case "kantoor":
                        Role kantoorRole = roleRepository.findByRole(RoleType.KANTOOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(kantoorRole);
                        // roles.add(kantoorRole);
                        break;
                    case "comdirectie":
                        Role comdirectieRole = roleRepository.findByRole(RoleType.COMDIRECTIE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(comdirectieRole);
                        // roles.add(comdirectieRole);
                        break;
                    case "compliance":
                        Role complianceRole = roleRepository.findByRole(RoleType.COMPLIANCE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(complianceRole);
                        // roles.add(complianceRole);
                        break;
                    case "sustainability":
                        Role sustainablityRole = roleRepository.findByRole(RoleType.SUSTAINABILITY)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(sustainablityRole);
                        // roles.add(sustainablityRole);
                        break;
                    case "kredietbeoordelaar":
                        Role kredietbeoordelaarRole = roleRepository.findByRole(RoleType.KREDIETBEOORDELAAR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(kredietbeoordelaarRole);
                        // roles.add(kredietbeoordelaarRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByRole(RoleType.KLANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setRole(userRole);
                        // roles.add(userRole);
                }
            });
        }
        // user.setRole(roles);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
