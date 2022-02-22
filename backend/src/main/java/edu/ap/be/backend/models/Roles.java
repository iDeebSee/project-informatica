package edu.ap.be.backend.models;

public enum Roles {
    KLANT,
    KANTOOR,
    KREDIETBEOORDELAAR,
    COMPLIANCE,
    SYSTAINABILITY,
    COMDIRECTIE,
    ADMINISTRATOR;

    public Roles fromValue(String name) {
        return Roles.valueOf(name.toUpperCase());
    }
}
