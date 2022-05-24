package edu.ap.be.backend.models;

public enum Status {
    GOEDGEKEURD("Goedgekeurd"),
    GEWEIGERD ("Geweigerd"),
    INBEHANDELING ("In behandeling"),
    VERDACHT ("Verdacht");


    private String text;

    Status(String s) {
        this.text = s;
    }
    public String getText(){
        return text;
    }

    public Status fromValue(String name) {
        return Status.valueOf(name.toUpperCase());
    }
}
