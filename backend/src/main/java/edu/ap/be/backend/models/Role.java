package edu.ap.be.backend.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Locale;

@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Roles rol;
    public Role(String name){
        this.rol = Roles.valueOf(name.toUpperCase(Locale.ROOT));
    }
}
