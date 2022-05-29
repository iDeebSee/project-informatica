package edu.ap.be.backend.models;

import com.itextpdf.text.BaseColor;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;

import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;



public class ContractPDF {
    public byte[] contractToPdf(long kredietID, String userName, String contractName, String subject, double lening, int looptijd) {
       // Document document = new Document();
       ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            // PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("HelloWorld.pdf"));
            // document.open();

            Document document = new Document();
            PdfWriter pdfWriter = PdfWriter.getInstance(document, baos);
            //PDPage page = new PDPage();
            //document.addPage(page);

            //PDPageContentStream contentStream = new PDPageContentStream(document, page);
            

            // contentStream.setFont(PDType1Font.COURIER, 16);
            // contentStream.beginText();
            // contentStream.showText(contractName);
            // contentStream.setFont(PDType1Font.COURIER, 12);
            document.open();
            document.add(new Paragraph(String.format("Tussen ondergetekenden: \n\t 1. %s \n Hierna genaamd de lener; \n En :\n\t 2. ALPHA Hierna genaamd de uitlener; \n\n", userName)));
            
            document.add(new Paragraph("Is overeengekomen hetgeen volgt:\n"));
            document.add(new Paragraph(String.format(("1. De lener verklaart schuldig te zijn wegens gelden heden als lening ontvangen, tegen kwijting, de som van %2f EUR aan de uitlener, die aanvaardt. \n"), lening)));
            document.add(new Paragraph(String.format(("2. De lener gaat de verbintenis aan de aan de uitlener verschuldigde som terug te betalen binnen %s jaar. tot de dag der terugbetaling van rechtswege en zonder aanmaning.\n"), looptijd)));
            document.add(new Paragraph(("De terugbetaling van het geleende kapitaal en de betaling van de intrest zullen moeten geschieden door storting op rekeningnummer van de uitlener." +
                    "\nDe lener zal zich niet op schuldvergelijking kunnen beroepen." +
                    "\nBij niet betaling op de vervaldag van voormelde intrest zal het bedrag van de hoofdsom der lening onmiddellijk opeisbaar worden, zo de uitlener dit wenst," +
                    " één maand na een eenvoudig bevel tot betaling bij aangetekend schrijven (of deurwaardersexploot), " +
                    "dat zonder gevolg is gebleven en waarin de uitlener dit voornemen heeft kenbaar gemaakt." +
                    "\nOnverminderd het voorgaande zal de intrest van rechtswege en zonder ingebrekestellingworden verhoogd met 10% ’s jaars. " +
                    "De uitlener zal eveneens het recht hebben om onmiddellijke teruggave van het geleende geld te eisen " +
                    "in geval van faillissement of kennelijk onvermogen (of bij niet-betaling van de overeengekomen afkortingen " +
                    "binnen de maand na de vervaldag). In deze gevallen is hij niet gehouden de lener in gebreke te stellen. " +
                    "In geval van overlijden van de lener vooraleer de schuld is terugbetaald, " +
                    "zal er hoofdelijkheid en ondeelbaarheid zijn onder alle erfgenamen tot terugbetaling van het kapitaal en de intresten; " +
                    "de kosten van de door art. 877 BW voorgeschreven betekening komen ten laste van de erfgenamen. \n")));
            

            // contentStream.setFont(PDType1Font.COURIER, 14);

            document.add(new Paragraph("Aflossingstable: \n"));
            //contentStream.setFont(PDType1Font.COURIER, 12);
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100); //Width 100%
            table.setSpacingBefore(10f); //Space before table
            table.setSpacingAfter(10f); 

            float[] columnWidths = {1f, 1f, 1f, 1f, 1f};
            table.setWidths(columnWidths);

            PdfPCell cell1 = new PdfPCell(new Paragraph("Datum"));
        cell1.setBorderColor(BaseColor.BLACK);
        cell1.setPaddingLeft(10);
        cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
 
        PdfPCell cell2 = new PdfPCell(new Paragraph("Uitstaande schuld"));
        cell2.setBorderColor(BaseColor.BLACK);
        cell2.setPaddingLeft(10);
        cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
 
        PdfPCell cell3 = new PdfPCell(new Paragraph("Rentebestanddeel"));
        cell3.setBorderColor(BaseColor.BLACK);
        cell3.setPaddingLeft(10);
        cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell3.setVerticalAlignment(Element.ALIGN_MIDDLE);

        PdfPCell cell4 = new PdfPCell(new Paragraph("Aflossingsbestanddeel"));
        cell4.setBorderColor(BaseColor.BLACK);
        cell4.setPaddingLeft(10);
        cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell4.setVerticalAlignment(Element.ALIGN_MIDDLE);

        PdfPCell cell5 = new PdfPCell(new Paragraph("Betaling = RB + AB"));
        cell5.setBorderColor(BaseColor.BLACK);
        cell5.setPaddingLeft(10);
        cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell5.setVerticalAlignment(Element.ALIGN_MIDDLE);

        table.addCell(cell1);
        table.addCell(cell2);
        table.addCell(cell3);
 
        document.add(table);


        document.add(new Paragraph(String.format("\n\n Opgesteld en overeengekomen te Maldegem, op %s, in 1 exemplaren, waarvan elke partij verklaart één exemplaar ontvangen te hebben.\n\nGetekend, \n\n", LocalDate.now().toString())));
            
//            String imageUrl = "localhost:8080/contract/handtekening/"+kredietID;
//            Image handtekening = null;
//            try {
//                handtekening = Image.getInstance(new URL(imageUrl));
//            } catch (MalformedURLException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            } catch (IOException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }
//            document.add(handtekening);

            document.close();
            // contentStream.endText();
            // contentStream.close();
            pdfWriter.flush();

            byte[] pdfAsBytes = baos.toByteArray();
            return pdfAsBytes;
            
        } catch (DocumentException e) {
            e.printStackTrace();
        } 
        return null;
    }

}
