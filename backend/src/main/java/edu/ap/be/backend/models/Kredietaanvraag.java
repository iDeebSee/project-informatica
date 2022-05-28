package edu.ap.be.backend.models;

import lombok.Data;

import java.io.File;

import javax.persistence.*;

import org.hibernate.type.TrueFalseType;

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
    @Column(name = "eigenVermogen", nullable = false)
    private double eigenVermogen;
    @Column(name = "lening", nullable = false)
    private double lening;
    @Column(name = "looptijd", nullable = false)
    private int looptijd;
    @Lob
    @Column(name = "file", nullable = true)
    private File file;
    @Column(name = "status")
    private Status status;
    @Column(name = "userID", nullable = false)
    private Long userID;
    @Column(name = "categorie", nullable = false)
    private Categorie categorie;
    @Column(name = "verantwoording")
    private String verantwoording;
    @Column(name = "feedback")
    private String feedback;

    @Column(name="contract")
    private Long contractID;

}
