package edu.ap.be.backend.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCrypt{

    public static final Logger log = LoggerFactory.getLogger(BCrypt.class);

    public BCrypt() {
    }

    public String HashWithSalt(String password){

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String hashedPass = bCryptPasswordEncoder.encode(password);
        log.info(hashedPass);
        return hashedPass;
    }
}
