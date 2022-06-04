package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "onderneming", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
@Data
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
// property = "id")
public class KBO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;
    @Column(name = "vat")
    private String vat;
    @Column(name = "nacbelCode")
    private String nacbelCode;
    @Column(name = "equity")
    private int equity;

    @Column(name = "assets")
    private int assets;
    @Column(name = "result")
    private int result;
    @Column(name = "tax")
    private int tax;

    @Column(name = "resultAfterTax")
    private int resultAfterTax;
    @Column(name = "financialCost")
    private int financialCost;
    @Column(name = "currentAssets")
    private int currentAssets;

    @Column(name = "stock")
    private int stock;
    @Column(name = "fixedAssets")
    private int fixedAssets;
    @Column(name = "shortTermDebt")
    private int shortTermDebt;

    @Column(name = "longTermDebt")
    private int longTermDebt;
    @Column(name = "depreciation")
    private int depreciation;
    @Column(name = "writeDown")
    private int writeDown;

    public KBO() {

    }

}
