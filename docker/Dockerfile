FROM openjdk:11 
RUN addgroup --system groep3
RUN adduser --system --group ideebsee
USER ideebsee:groep3
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080   