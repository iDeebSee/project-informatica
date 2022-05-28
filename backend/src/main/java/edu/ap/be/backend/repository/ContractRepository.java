package edu.ap.be.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.ap.be.backend.models.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    Optional<Contract> findContractBykredietID(@Param("id") Long id);
}
