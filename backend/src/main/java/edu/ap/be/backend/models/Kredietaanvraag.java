package edu.ap.be.backend.models;


import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name= "kredietaanvragen")
@Data
public class Kredietaanvraag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "naam")
    private String naam;
    @Column(name = "eigenVermogen")
    private double eigenVermogen;
    @Column(name = "lening")
    private double lening;
    @Column(name = "looptijd")
    private int looptijd;
    @Column(name = "status")
    private StatusType status;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = edu.ap.be.backend.models.User.class)
    @JoinColumn(name = "klantID")
    //@JsonBackReference
    
    //@Column(name = "klantID")
    private long klantID;
    @Column(name = "categorie")
    private CategorieType categorie;
    @Column(name = "verantwoording")
    private String verantwoording;


}
