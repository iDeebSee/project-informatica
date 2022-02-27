package edu.ap.be.backend.models;

import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column
    private RoleType role;
    @OneToMany(mappedBy = "role")
    private List<User> users;

    //private List<Roles> roles = new ArrayList<>();
    /*public Role(String name){
        this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
    }*/

    public Role() {
    }

    public void add(RoleType role){
        this.role = role;
    }
}
