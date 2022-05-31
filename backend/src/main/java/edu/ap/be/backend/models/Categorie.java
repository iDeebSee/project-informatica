package edu.ap.be.backend.models;

import java.util.Locale.Category;

public enum Categorie {

    GEBOUWEN("gebouwen"),
    ROLLENDMATERIEEL("rollend materieel"),
    KLEINMATERIEEL("klein materieel(vb gsm)"),
    KANTOOR("kantoor"),
    INDUSTRIELEGEBOUWEN("industriele gebouwen"),
    MEUBILAIRENMACHINES("meubilair en machines");

    
    private String text;

    Categorie(String s) {
        this.text = s;
    }
    public String getText(){
        return text;
    }

    public Category fromValue(String name) {
        return Category.valueOf(name.toUpperCase());
    }
}
