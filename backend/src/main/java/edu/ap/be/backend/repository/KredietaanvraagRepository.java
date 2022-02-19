package edu.ap.be.backend.repository;

import edu.ap.be.backend.models.Kredietaanvraag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KredietaanvraagRepository extends JpaRepository<Kredietaanvraag, Integer> {
    Kredietaanvraag findKredietaanvraagByKlantID(@Param("klantID") String klantID);
}
