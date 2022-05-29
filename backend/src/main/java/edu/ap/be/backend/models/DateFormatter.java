package edu.ap.be.backend.models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateFormatter {
    public static String format(LocalDate date){
        String europeanDatePattern = "dd/MM/yyyy";
        DateTimeFormatter europeanDateFormatter = DateTimeFormatter.ofPattern(europeanDatePattern);
        String formatedDate = europeanDateFormatter.format(date);
        return formatedDate;
    }
}
