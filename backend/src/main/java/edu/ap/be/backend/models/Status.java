package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "status")
public class Status{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private StatusType status;
    @OneToMany(mappedBy = "status")
    @JsonManagedReference
    private List<Kredietaanvraag> kredieten;

    //private List<Roles> roles = new ArrayList<>();
    /*public Role(String name){
        this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
    }*/

    public Status(StatusType status) {
        this.status = status;
    }

    public Status(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StatusType getStatus() {
        return status;
    }

    public void setRole(StatusType status) {
        this.status = status;
    }

    public List<Kredietaanvraag> getKredieten() {
        return kredieten;
    }

    public void setUsers(List<Kredietaanvraag> kredieten) {
        this.kredieten = kredieten;
    }

    public void add(StatusType status){
        this.status = status;
    }

}
