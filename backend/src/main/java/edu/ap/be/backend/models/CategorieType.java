package edu.ap.be.backend.models;

import java.util.Locale.Category;

public enum CategorieType {

    GEBOUWEN("gebouwen"),
    ROLLENDMATERIEEL("rollend materieel(vb laptop)"),
    KLEINMATERIEEL("klein materieel(vb gsm)"),
    KANTOOR("kantoor"),
    INDUSTRIEELEGEBOUWEN("industriele gebouwen"),
    MEUBELAIRENMACHINES("meubilair en machines");


    
    private String text;

    CategorieType(String s) {
        this.text = s;
    }
    public String getText(){
        return text;
    }

    public Category fromValue(String name) {
        return Category.valueOf(name.toUpperCase());
    }
}
