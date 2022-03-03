package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column
    private RoleType role;
    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private List<User> users;

    //private List<Roles> roles = new ArrayList<>();
    /*public Role(String name){
        this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
    }*/

    public Role(RoleType role) {
        this.role = role;
    }

    public Role(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void add(RoleType role){
        this.role = role;
    }

}
