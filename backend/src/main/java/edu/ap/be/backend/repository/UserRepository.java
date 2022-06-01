package edu.ap.be.backend.repository;

import edu.ap.be.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByemail(@Param("email") String email);
    Boolean existsByEmail(String email);
    Boolean existsByVat(String vat);
}
