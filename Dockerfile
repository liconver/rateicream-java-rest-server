FROM openjdk:8-jdk-alpine
ADD build/libs/IceCreamRatings-0.0.1-SNAPSHOT.jar IceCreamRatings-0.0.1-SNAPSHOT.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","IceCreamRatings-0.0.1-SNAPSHOT.jar"]