package edu.ap.be.backend.controller;

import edu.ap.be.backend.models.KBO;
import edu.ap.be.backend.models.Kredietaanvraag;
import edu.ap.be.backend.models.Sector;
import edu.ap.be.backend.models.Status;
import edu.ap.be.backend.models.User;
import edu.ap.be.backend.exceptions.ResourceNotFoundException;
import edu.ap.be.backend.repository.KBOrepository;
import edu.ap.be.backend.repository.KredietaanvraagRepository;
import edu.ap.be.backend.repository.SectorRepository;
import edu.ap.be.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import ch.qos.logback.core.joran.conditional.ElseAction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/kredietaanvragen")
public class KredietAanvraagController {
    @Autowired
    private KredietaanvraagRepository kredietRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KBOrepository kboRepository;

    @Autowired
    private SectorRepository sectorRepository;
    public double solvabiliteit(Double zelfgefinancieerd,Double totaal) {

            
    
        return ((zelfgefinancieerd/totaal)*100);
         
     }
     public double rendabiliteit(int resultaatNaTax ,Double gemgeinvesteerdeigenVermogenl) {

            
    
        return ((resultaatNaTax/gemgeinvesteerdeigenVermogenl)*100);
         
     }
     public double liquiditeit(int equity,int assets,int stock,int vreemdVermogen) {

            
    
        return ((equity+assets+stock)/vreemdVermogen);
         
     }
     

    @GetMapping("")
    public List<Kredietaanvraag> getAllKredietaanvragen() {
        System.out.println(kredietRepository.findAll().toString());
        return kredietRepository.findAll();
    }

    @GetMapping("/naam/")
    public List<Kredietaanvraag> getAllKredietaanvragenByEmptyName() {
        System.out.println(kredietRepository.findAll().toString());
        return kredietRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kredietaanvraag> getKredietAanvraagByID(@PathVariable(value = "id") long kredietID)
            throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + kredietID));
        System.out.println(kredietRepository.findById(kredietID).toString());
        return ResponseEntity.ok().body(kredietaanvraag);
    }
     @GetMapping("/status/{status}")
    public List<Kredietaanvraag> getKredietAanvraagByStatus(@PathVariable(value = "status") String status)
            throws ResourceNotFoundException {
                List<Kredietaanvraag> kredietaanvraag =new ArrayList<>();
         kredietaanvraag =  kredietRepository.findKredietBystatus(Status.valueOf(status));
         
        return kredietaanvraag;
    }

    @GetMapping("/naam/{name}")
    public List<Kredietaanvraag> getKredietAanvraagByNaam(@PathVariable(value = "name") String name) {

        List<Kredietaanvraag> kredieten = new ArrayList<>();
        List<Kredietaanvraag> allKredietList = kredietRepository.findAll();
        System.out.println("---------------- ALJLDSKJDSDSF DSF ---------------" + name.getClass().getName());

        for (Kredietaanvraag kred : allKredietList) {
            if (kred.getNaam().toLowerCase().contains(name.toString().toLowerCase())) {
                System.out.println(kred.toString());
                kredieten.add(kred);
            } 
        }

        return kredieten;
    }

    @GetMapping("/user/{id}")
    public List<Kredietaanvraag> getKredietAanvraagByuserID(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {

        List<Kredietaanvraag> kredieten = new ArrayList<>();
        List<Kredietaanvraag> allKredietList = kredietRepository.findAll();
        for (Kredietaanvraag kred : allKredietList) {
            if (kred.getUserID() == id) {
                kredieten.add(kred);
            }
        }

        return kredieten;
    }
    
    @PostMapping("")
    public Kredietaanvraag createKredietAanvraag(@Validated @ModelAttribute Kredietaanvraag krediet) {
        List<User> userList = new ArrayList<>();
        userList = userRepository.findAll();
        List<KBO> ondList = new ArrayList<>();
         ondList=kboRepository.findAll();
         List<Sector> sectorlist = new ArrayList<>();
         sectorlist= sectorRepository.findAll();
         

        for (User user : userList) {

           
              
             for (KBO ond: ondList)
             {
                 System.out.println("boolean"+ond.getVat().equals(user.getVat()) );
                 System.out.println("hehe "+ond.getVat()+ " "+ user.getVat());


                 if(ond.getVat().equals(user.getVat()))
                 {

                     for(Sector s: sectorlist)
                     {
                         System.out.println(s);


                         if(ond.getNacbelCode().equals(s.getNasiCode()))
                         {
                             System.out.println(ond.getNacbelCode()==s.getNasiCode());
                             if(s.getIsBlack()==true)
                             {
                                 krediet.setStatus(Status.GEWEIGERD);
                                 krediet.setFeedback("Deze sector staat op de zwarte lijst en is niet toegestaan.");
                                 return kredietRepository.save(krediet);
                             }
                             else if(s.getIsBlack()==false && ( s.getNaam().toLowerCase().equals("casino")|| s.getNaam().toLowerCase().equals("wapenindustrie")))
                             {
                                krediet.setStatus(Status.INBEHANDELING);
                                System.out.println("1ste");
                                krediet.setFeedback("Deze aanvraag moet nagekeken worden vanwege de sector.");

                                return kredietRepository.save(krediet);


                             }
                             else if (s.getIsBlack()==false && (krediet.getLening()>=3000000))
                             {
                                krediet.setStatus(Status.VERDACHT);
                                krediet.setFeedback("Deze aanvraag is verdacht en moet nagekeken worden.");

                                return kredietRepository.save(krediet);
                             }
                             else if(s.getIsBlack()==false && s.getNaam().toLowerCase()=="tandarts"|| s.getNaam().toLowerCase()=="dokter"|| s.getNaam().toLowerCase()=="notaris")
                             {
                                krediet.setStatus(Status.GOEDGEKEURD);
                                krediet.setFeedback("Deze aanvraag is goedgekeurd.");

                                return kredietRepository.save(krediet);
                             }
                             else if(s.getIsBlack()==false && (solvabiliteit(krediet.getEigenVermogen(), krediet.getLening()))>25 &&
                              rendabiliteit(ond.getResultAfterTax(), krediet.getEigenVermogen()) >=5 && liquiditeit(ond.getEquity(), ond.getAssets(), 
                              ond.getStock(), ond.getShortTermDebt())>=1)
                             {
                                krediet.setStatus(Status.GOEDGEKEURD);
                                krediet.setFeedback("Deze aanvraag is goedgekeurd.");
                                System.out.println("2ste");

                                return kredietRepository.save(krediet);

                             }
                            
                         }
                        

                     }
                 }
             
            } 
        }
        System.out.println("************************************************************************************");
        krediet.setStatus(Status.GEWEIGERD);
        krediet.setFeedback("Deze aanvraag is afgekeurd, omdat de ondernemingsnummers niet overeenkomen.");

        return kredietRepository.save(krediet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kredietaanvraag> updateKredietAanvraag(@PathVariable(value = "id") long kredietID,
            @Validated @RequestBody Kredietaanvraag kredietDetails) throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietaanvraag.setEigenVermogen(kredietDetails.getEigenVermogen());
        kredietaanvraag.setUserID(kredietDetails.getUserID());
        kredietaanvraag.setLening(kredietDetails.getLening());
        kredietaanvraag.setLooptijd(kredietDetails.getLooptijd());
        kredietaanvraag.setNaam(kredietDetails.getNaam());
        kredietaanvraag.setStatus(kredietaanvraag.getStatus());
        kredietaanvraag.setCategorie(kredietaanvraag.getCategorie());

        final Kredietaanvraag updatedKredietAanvraag = kredietRepository.save(kredietaanvraag);
        return ResponseEntity.ok(updatedKredietAanvraag);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteKredietAanvraag(@PathVariable(value = "id") long kredietID)
            throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

        kredietRepository.delete(kredietaanvraag);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    


    @PutMapping("/status/{id}")
    public ResponseEntity<Kredietaanvraag> updateKredietAanvraagStatus(@PathVariable(value = "id") long kredietID,
            @Validated @RequestBody Kredietaanvraag kredietDetails) throws ResourceNotFoundException {
        Kredietaanvraag kredietaanvraag = kredietRepository.findById(kredietID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Kredietaanvraag not found for this id :: " + kredietID));

                        System.out.println(kredietDetails);
                        if (kredietDetails.getStatus().equals(Status.GEWEIGERD)) {
                            kredietaanvraag.setStatus(Status.GEWEIGERD);
                        }else if (kredietDetails.getStatus().equals(Status.GOEDGEKEURD)){
                            kredietaanvraag.setStatus(Status.GOEDGEKEURD);
                        }
        
       

        final Kredietaanvraag updatedKredietAanvraag = kredietRepository.save(kredietaanvraag);
        return ResponseEntity.ok(updatedKredietAanvraag);
    }

}
