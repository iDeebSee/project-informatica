package edu.ap.be.backend.controller;

import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.*;
import edu.ap.be.backend.repository.ContractRepository;
import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    @Autowired
    KBOrepository kboRepository;

    @GetMapping("")
    public List<Contract> getContracts() throws ResourceNotFoundException {
        return contractRepository.findAll();
    }

    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractByID(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Contract contract = contractRepository.findContractBykredietID(id)
                .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));
        return ResponseEntity.ok().body(contract);
    }

    @PostMapping("/{id}")
    public Contract createContract(@Validated @PathVariable(value = "id") long id) throws ResourceNotFoundException {

        if (contractRepository.findContractBykredietID(id).isPresent()){
            return contractRepository.findContractBykredietID(id)
                    .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));
        }
        else {
            Kredietaanvraag krediet = kredietRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("krediet not found for this id :: " + id));
            if (!krediet.getStatus().equals(Status.GOEDGEKEURD)){
                //return new ResourceNotFoundException("Can not make a contract!");
            }
        }

        Kredietaanvraag krediet = kredietRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("krediet not found for this id :: " + id));

        User user = userRepository.findById(krediet.getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + krediet.getUserID()));

        KBO onderneming = kboRepository.findKBOByvat(user.getVat())
                .orElseThrow(() -> new ResourceNotFoundException("onderneming not found for this id :: " + user.getVat()));

        ContractPDF contractPDF = new ContractPDF();

        String aanmaakDatum = DateFormatter.format(LocalDate.now());

        byte[] contractInPDF = contractPDF.contractToPdf(krediet.getId(), onderneming.getName(),user.getFirstName()+" "+user.getLastName(), krediet.getNaam(), krediet.getVerantwoording(), krediet.getLening(), krediet.getLooptijd(), krediet.getCategorie(), aanmaakDatum);
        Contract contract  = new Contract();
        contract.setBestand(contractInPDF);
        contract.setGehandtekend(false);
        contract.setKredietID(krediet.getId());
        contract.setAanmaakDatum(LocalDate.now());
        return contractRepository.save(contract);

        // Contract contract = contractRepository.findContractBykredietaanvraag(id)
        // .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));

    }
}
