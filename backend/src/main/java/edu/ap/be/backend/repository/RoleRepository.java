package edu.ap.be.backend.repository;

import edu.ap.be.backend.models.Role;
import edu.ap.be.backend.models.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<RoleType> findByRole(RoleType role);
}
