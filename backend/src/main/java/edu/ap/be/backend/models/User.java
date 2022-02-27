package edu.ap.be.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = edu.ap.be.backend.models.Role.class)
    @JoinColumn(name = "fk_role")
    private Role role;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "firstName")
    private String firstName;


    public User(String email, String encode) {
    }

}
