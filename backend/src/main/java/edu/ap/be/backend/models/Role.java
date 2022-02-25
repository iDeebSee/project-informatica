package edu.ap.be.backend.models;

import lombok.Data;
import javax.persistence.*;
import java.util.List;
import java.util.Locale;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column
    private Roles role;
    @OneToMany(mappedBy = "role")
    private List<User> users;
    /*public Role(String name){
        this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
    }*/

    public Role() {
    }
}
