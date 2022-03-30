package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categorie")
public class Categorie{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private CategorieType categorie;
    @OneToMany(mappedBy = "categorie")
    @JsonManagedReference
    private List<Kredietaanvraag> kredieten;

    public Categorie(CategorieType categorie) {
        this.categorie = categorie;
    }

    public Categorie(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CategorieType getCategorie() {
        return categorie;
    }

    public void setCategorie(CategorieType categorie) {
        this.categorie = categorie;
    }

    public List<Kredietaanvraag> getkredieten() {
        return kredieten;
    }

    public void setKredieten(List<Kredietaanvraag> kredieten) {
        this.kredieten = kredieten;
    }

    public void add(CategorieType categorie){
        this.categorie = categorie;
    }

}
