package edu.ap.be.backend.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import org.springframework.data.annotation.Transient;
import java.util.List;

@Entity
@Table(name = "roles")
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
// property = "id")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(insertable = false, updatable = false)
    private Long id;

    // meer aandachtt hieraan later
    @Transient
    @Enumerated(EnumType.STRING)
    @Column(insertable = false, updatable = false)

    private RoleType role;

    @JsonManagedReference
    // @JoinColumn("users", insertable=false, updatable=false)
    @OneToMany(mappedBy = "role", cascade = CascadeType.REMOVE)
    @Column(insertable = false, updatable = false)
    private List<User> users;

    // private List<Roles> roles = new ArrayList<>();
    /*
     * public Role(String name){
     * this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
     * }
     */

    public Role(RoleType role) {
        this.role = role;
    }

    public Role() {

    }

    public Role(String role) {
        this.role = RoleType.valueOf(role.toUpperCase());
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

    public void add(RoleType role) {
        this.role = role;
    }

}
