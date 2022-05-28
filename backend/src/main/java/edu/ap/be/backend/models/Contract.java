package edu.ap.be.backend.models;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "contract")
@Data
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "gehandtekend")
    private boolean gehandtekend = false;

    @Lob
    @Column(name = "bestand")
    private byte[] bestand;

    @Column(name = "kredietID")
    private long kredietID;
}
