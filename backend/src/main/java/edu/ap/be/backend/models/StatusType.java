package edu.ap.be.backend.models;

public enum StatusType {
    GOEDGEKEURD("Goedgekeurd"),
    GEWEIGERD ("Geweigerd"),
    INBEHANDELING ("In behandeling");

    private String text;

    StatusType(String s) {
        this.text = s;
    }
    public String getText(){
        return text;
    }

    public StatusType fromValue(String name) {
        return StatusType.valueOf(name.toUpperCase());
    }
}
