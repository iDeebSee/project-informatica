package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.Contract;
import edu.ap.be.backend.models.ContractPDF;
import edu.ap.be.backend.models.Kredietaanvraag;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.repository.ContractRepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contract")
public class ContractController {

    @Autowired
    ContractRepository contractRepository;
    @Autowired
    KredietaanvraagRepository kredietRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public List<Contract> getContracts() throws ResourceNotFoundException {
        return contractRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractByID(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));
        return ResponseEntity.ok().body(contract);
    }

    @PostMapping("/{id}")
    public Contract createContract(@Validated @PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Kredietaanvraag krediet = kredietRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("krediet not found for this id :: " + id));

        User user = userRepository.findById(krediet.getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + id));

        ContractPDF contractPDF = new ContractPDF();
        byte[] contractInPDF = contractPDF.contractToPdf(krediet.getId(), user.getFirstName()+" "+user.getLastName(), krediet.getNaam(), krediet.getVerantwoording(), krediet.getLening(), krediet.getLooptijd());
        Contract contract  = new Contract();
        contract.setBestand(contractInPDF);
        contract.setGehandtekend(false);
        contract.setKredietID(krediet.getId());
        return contractRepository.save(contract);

        // Contract contract = contractRepository.findContractBykredietaanvraag(id)
        // .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));

    }
}
