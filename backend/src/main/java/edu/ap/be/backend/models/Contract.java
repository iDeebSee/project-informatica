package edu.ap.be.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Entity
@Table(name = "Contract", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
@Data
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "id_kredietaanvraag")
    private Long kredietAanvraagID;

    @Column(name = "gehandtekend")
    private boolean gehandtekend;

    
  
}
