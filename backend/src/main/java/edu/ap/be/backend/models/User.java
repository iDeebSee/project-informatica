package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
@Data
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = edu.ap.be.backend.models.Role.class)
    @JoinColumn(name = "role")
    @JsonBackReference
    private Role role;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "firstName")
    private String firstName;

    @Column(name="enabled")
    @NonNull
    private Boolean enabled = true;





    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
        this.status = true;
        
    }

    public User() {

    }
}
