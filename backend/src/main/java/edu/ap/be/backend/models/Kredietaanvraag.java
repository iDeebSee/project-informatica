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
    private Status status;
    @Column(name = "klantID")
    private long klantID;

}
