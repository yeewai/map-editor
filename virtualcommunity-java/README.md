# Project Title

* One short paragraph of project description goes here
* link to confluence page

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### System Requirements/Dependencies
What things you need to install the software and how to install them

```
name of software with version number, links to install guide
```

### Installation
```
how to install in LMS
how to create test instances (automated scripts, etc)
```

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

## Built With

* ```
Scala Play
```(http://link.to.scala) - The web framework used
```

## Contributing

Please read ```
CONTRIBUTING.md
```(https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.
