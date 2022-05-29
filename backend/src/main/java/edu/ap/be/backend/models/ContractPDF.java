package edu.ap.be.backend.models;

import com.itextpdf.text.*;

import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.time.LocalDate;


//switch case voor categorie met rente dingen

public class ContractPDF {
    int interest = 0;


    private double aflossingsBestandsdeel(double nominaleWaarde, int termijn){
        return (nominaleWaarde / termijn);
    }

//    private double uitstaandeSchuld(double nominaleWaarde, Double aflossingsbestandsdeel, int termijn){
//        final double afloss = aflossingsBestandsdeel(nominaleWaarde, termijn);
//        final int _termijn = termijn;
//        do{
//            double nw = nominaleWaarde - aflossingsbestandsdeel;
//            System.out.println("-------------nominale waarde: "+nominaleWaarde+" - aflosbest deel: " + aflossingsbestandsdeel);
//            return uitstaandeSchuld(nw, afloss, _termijn);
//        }
//        while(nominaleWaarde > 0 || aflossingsbestandsdeel > 0);
//    }

    private double epicRecursiveFunctionThatReturnsPrijsZetting(double nominaleWaarde, int termijn, int interest){
        final double aflossingsBestandsdeel = aflossingsBestandsdeel(nominaleWaarde, termijn);
        double uitstaandeSchuld = nominaleWaarde - aflossingsBestandsdeel;
        double renteBestandsdeel = uitstaandeSchuld/interest;
        double betaling = aflossingsBestandsdeel+renteBestandsdeel;


        return 0;
    }

    public byte[] contractToPdf(long kredietID,String bedrijf, String userName, String contractName, String subject, double lening, int looptijd, Categorie categorie, String aanmaakDatum) {
       // Document document = new Document();
       //System.out.println("NWNWNWNWNNWNWNW______------------NWNWNWNWNWNNWNWNWNWNWN: "+uitstaandeSchuld(lening, aflossingsBestandsdeel(lening, looptijd), looptijd));
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
            document.addTitle(contractName);
            document.addSubject(subject);
            document.add(new Chunk(String.format("Contract %s \n", contractName), FontFactory.getFont(FontFactory.COURIER_BOLD, 20, Font.BOLD)));



            document.add(new Paragraph(String.format("\nTussen ondergetekenden: \n\t 1. %s [%s] \n Hierna genaamd de lener; \n En :\n\t 2. ALPHA\n Hierna genaamd de uitlener; \n\n", userName, bedrijf)));
            
            document.add(new Paragraph("Is overeengekomen hetgeen volgt:\n"));
            document.add(new Paragraph(String.format(("\n1. De lener verklaart schuldig te zijn wegens gelden heden als lening ontvangen, tegen kwijting, de som van %.2f EUR aan de uitlener, die aanvaardt. \n"), lening)));
            document.add(new Paragraph(String.format(("\n2. De lener gaat de verbintenis aan de aan de uitlener verschuldigde som terug te betalen binnen %s jaar. tot de dag der terugbetaling van rechtswege en zonder aanmaning.\n"), looptijd)));
            document.add(new Paragraph("De terugbetaling van het geleende kapitaal en de betaling van de intrest zullen moeten geschieden door storting op rekeningnummer van de uitlener." +
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
                    "de kosten van de door art. 877 BW voorgeschreven betekening komen ten laste van de erfgenamen. \n"));
            

            // contentStream.setFont(PDType1Font.COURIER, 14);

            document.add(new Paragraph("\nAflossingstabel: \n\n"));
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
            table.addCell(cell4);
            table.addCell(cell5);



            double maandelijksAfschrijving;
            final int aantalMaanden = (looptijd * 12);


            if (categorie.equals(Categorie.KANTOOR) || categorie.equals(Categorie.GEBOUWEN)){
                interest = 3;
                //maandelijksAfschrijving = (interest / 12);
            }else if (categorie.equals(Categorie.INDUSTRIEELEGEBOUWEN)){
                interest = 5;
            }else if (categorie.equals(Categorie.MEUBILAIRENMACHINES)){
                interest = 10;
            }else if (categorie.equals(Categorie.ROLLENDMATERIEEL)){
                interest = 20;

            }else if (categorie.equals(Categorie.KLEINMATERIEEL)){
                interest = 33;
            }


            System.out.println(categorie + " - "+ interest);


            DecimalFormat df = new DecimalFormat();
            df.setMaximumFractionDigits(2);

            for (int i = 0; i < (5 * looptijd); i++) {
                if ((lening - ((lening/looptijd) * i) >= 0)){
                    System.out.println(interest);
                    table.addCell("Jaar "+ i)   ;//datum
                    table.addCell(String.valueOf(df.format((lening - ((lening/looptijd) * i)))));//uitstaande schuld
                    table.addCell(String.valueOf(df.format(lening * ((float)interest/100) * i)));//rente bestanddeel
                    table.addCell(String.valueOf(df.format((lening/looptijd) * i)));//aflossing bestanddeel
                    table.addCell(String.valueOf(df.format(((lening * ((float) interest/100)) + ((lening/looptijd))) * i)));//betaling = rb + ab
                }
            }

            document.add(table);




            document.add(new Paragraph(String.format("\n\nOpgesteld en overeengekomen op %s, in 1 exemplaren, waarvan elke partij verklaart één exemplaar ontvangen te hebben.\n\nGetekend, \n\n", aanmaakDatum)));
            
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
