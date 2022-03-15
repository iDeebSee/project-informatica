package edu.ap.be.backend.controller;

import java.io.IOException;

import javax.swing.text.AbstractDocument.Content;

// nog jar files van PDFBox toevoegen aan het project zodat deze code werkt
public class PDFconverterController {
    
    public PDF createFeedbackPDF() {
        
        String filename = "firstFeedbackPDF.pdf";
        
        try {
            PDDocument doc = new PDDocument();
            PDPage page = new PDPage();
            PDPageContentStream content = new PDPageContentStream(doc, page);

            doc.addPage(page);

            content.beginText();
            content.setFont(PDType1Font.HELVETICA, 26);
            content.moveTextPositionByAmount(250,750);
            content.drawString("Feedbackdocument krediet aanvraag");
            content.endText();
            content.close();

            doc.save(filename);
            doc.close();

            return doc;
        }
        catch(IOException e) {
            System.out.println(e.getMessage());
        }  
    } 
}
