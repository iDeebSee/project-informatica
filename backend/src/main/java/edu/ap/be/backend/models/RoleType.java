package edu.ap.be.backend.models;

public enum RoleType {
    ADMINISTRATOR,
    KLANT,
    KANTOOR,
    KREDIETBEOORDELAAR,
    COMPLIANCE,
    SUSTAINABILITY,
    COMDIRECTIE;

    public RoleType fromValue(String name) {
        return RoleType.valueOf(name.toUpperCase());
    }
}
