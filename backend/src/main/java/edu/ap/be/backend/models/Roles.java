package edu.ap.be.backend.models;

public enum Roles {
    ADMINISTRATOR,
    KLANT,
    KANTOOR,
    KREDIETBEOORDELAAR,
    COMPLIANCE,
    SYSTAINABILITY,
    COMDIRECTIE;

    public Roles fromValue(String name) {
        return Roles.valueOf(name.toUpperCase());
    }
}
