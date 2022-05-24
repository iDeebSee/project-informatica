package edu.ap.be.backend.repository;

import edu.ap.be.backend.models.KBO;
import edu.ap.be.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KBOrepository extends JpaRepository<KBO, Long> {
    Optional<KBO>  findKBOByvat(@Param("vat") String vat);
}
