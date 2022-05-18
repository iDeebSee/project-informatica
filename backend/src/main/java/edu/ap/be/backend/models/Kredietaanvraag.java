package edu.ap.be.backend.models;

import lombok.Data;

import java.io.File;

import javax.persistence.*;

@Entity
@Table(name = "kredietaanvragen")
@Data
public class Kredietaanvraag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "naam")
    private String naam;
    @Column(name = "eigenVermogen",  nullable = false)
    private double eigenVermogen;
    @Column(name = "lening",  nullable = false)
    private double lening;
    @Column(name = "looptijd",  nullable = false)
    private int looptijd;
    @Column(name = "file")
    private File file;
    @Column(name = "status")
    private Status status;
    @Column(name = "userID",  nullable = false)
    private Long userID;
    @Column(name = "categorie",  nullable = false)
    private Categorie categorie;
    @Column(name = "verantwoording")
    private String verantwoording;

}
