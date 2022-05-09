package edu.ap.be.backend.repository;
import edu.ap.be.backend.models.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


   

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {

}
