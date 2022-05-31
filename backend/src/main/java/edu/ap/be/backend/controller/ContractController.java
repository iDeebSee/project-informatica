package edu.ap.be.backend.controller;

import com.itextpdf.text.Image;
import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.models.*;
import edu.ap.be.backend.repository.ContractRepository;
import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import edu.ap.be.backend.repository.UserRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Arrays;
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

    @Transactional
    @PutMapping("upload/{id}")
        public ResponseEntity<Contract> uploadFile(@PathVariable(value = "id") long id,
        @Validated @ModelAttribute Contract file) throws ResourceNotFoundException, IOException {



        System.out.println("bestand: "+ Arrays.toString(file.getBestand()));
        Contract contract = contractRepository.findContractBykredietID(id)
                .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));



        String encodedString = new String(Base64.encodeBase64(file.getBestand()));

        byte [] bestand=encodedString.getBytes();

        contract.setBestand(bestand);
        contract.setGehandtekend(true);
        final Contract updatedContract = contractRepository.save(contract);
        return ResponseEntity.ok(updatedContract);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable(value = "id") long id,
                                                   @Validated @RequestBody @NotNull Contract contractInput) throws ResourceNotFoundException {
        Contract contract = contractRepository.findContractBykredietID(id)
                .orElseThrow(() -> new ResourceNotFoundException("contract not found for this id :: " + id));

        Kredietaanvraag krediet = kredietRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("krediet not found for this id :: " + id));

        User user = userRepository.findById(krediet.getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("user not found for this id :: " + krediet.getUserID()));


        KBO onderneming = kboRepository.findKBOByvat(user.getVat())
                .orElseThrow(() -> new ResourceNotFoundException("onderneming not found for this id :: " + user.getVat()));


        ContractPDF contractPDF = new ContractPDF();
        String aanmaakDatum = DateFormatter.format(contract.getAanmaakDatum());

        byte[] file = contractPDF.contractToPdf(krediet.getId(), onderneming.getName(),user.getFirstName()+" "+user.getLastName(), krediet.getNaam(), krediet.getVerantwoording(), krediet.getLening(), krediet.getLooptijd(), krediet.getCategorie(), aanmaakDatum, contractInput.getHandtekening(), true);

        contract.setBestand(file);

        contract.setGehandtekend(true);
        contract.setHandtekening(contractInput.getHandtekening());
        final Contract updatedContract = contractRepository.save(contract);
        return ResponseEntity.ok(updatedContract);
    }


    @Transactional
    @PostMapping("/{id}")
    public Object createContract(@Validated @PathVariable(value = "id") long id) throws ResourceNotFoundException {

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


        byte[] contractInPDF = contractPDF.contractToPdf(krediet.getId(), onderneming.getName(),user.getFirstName()+" "+user.getLastName(), krediet.getNaam(), krediet.getVerantwoording(), krediet.getLening(), krediet.getLooptijd(), krediet.getCategorie(), aanmaakDatum, null, false);

        if (!krediet.getStatus().equals(Status.GOEDGEKEURD)){
            return "No contract can be made";
        }

        Contract contract  = new Contract();
        contract.setBestand(contractInPDF);
        if (contract.isGehandtekend()){
            contract.setGehandtekend(true);
        }else{
            contract.setGehandtekend(false);
        }
        if (contract.getHandtekening() != null){
            contract.setHandtekening(contract.getHandtekening());
        }

        contract.setKredietID(krediet.getId());
        contract.setAanmaakDatum(LocalDate.now());
        return contractRepository.save(contract);


    }
}
