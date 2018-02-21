# Virtual Community Backend

* Backend to power all of the virtual community front end bits.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### System Requirements/Dependencies
What things you need to install the software and how to install them

```
Java Spring
Maven
```

### Installation

???

### Starting the server
```
mvn spring-boot:run
```

## Running the tests
To run tests and generate a surefire report (so it's easier to see test results)
* `` mvn surefire-report:report``
* Navigate to ``<<project root>>/target/site/surefire-report.html``
    * If the html looks unformatted, you may have to generate the css first using ``mvn site``

To check coverage
* ``mvn test``
* Navigate to ``<<project root>>/target/jacoco-ut/mapeditor/index.html``

## Deployment

Add additional notes about how to deploy this on a live system


## Versioning

We use [SemVer](http://semver.org/) for versioning.
