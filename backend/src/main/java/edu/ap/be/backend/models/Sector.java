package edu.ap.be.backend.models;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name= "sector")
@Data

public class Sector {
   
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    
    @Column(name = "naam")
    private String naam;
    
    @Column(name = "NACEcode")
    private String NACEcode;
    @Column(name = "isBlack")
    private Boolean isBlack;


}

    

