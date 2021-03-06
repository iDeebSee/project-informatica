package edu.ap.be.backend.repository;

import edu.ap.be.backend.models.Kredietaanvraag;
import edu.ap.be.backend.models.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KredietaanvraagRepository extends JpaRepository<Kredietaanvraag, Long> {
    // Optional< Kredietaanvraag> findKredietaanvraagByUserID(@Param("userID") Long
    // userID);
     List< Kredietaanvraag> findKredietBystatus(@Param("status") Status status);


}
