package edu.ap.be.backend.models;


import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;

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
//    @Type(type = "org.hibernate.type.BlobType")
    @Column(name = "bestand")
    private byte[] bestand;

    @Column(name = "kredietID")
    private long kredietID;

    @Column(name="aanmaakDatum")
    private LocalDate aanmaakDatum;
}
