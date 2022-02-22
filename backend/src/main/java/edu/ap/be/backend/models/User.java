package edu.ap.be.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "rol")
    private Roles rol;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "firstName")
    private String firstName;
}
