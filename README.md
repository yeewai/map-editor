# Virtual Community v5.0.0.0
(lol this is so not ready yet)

* Virtual Community is an LTI virtual community application.  It is currently deployed as an instance called Jayhawkville.  Jayhawkville is a virtual school district, driven by simulated student data and case studies pulled from real-life schools. Throughout the program, students are prompted to visit and explore Jayhawkville  in order to complete assignments, examine case studies and make crucial decisions that parallel scenarios they would face in a live school setting.   Jayhawkville has over 30 simulated schools spanning suburban, urban, and rural communities, complete with educators and students representing diverse real-world environments.
* https://everspring.atlassian.net/wiki/spaces/PID/pages/40141075/LTI+-+Virtual+Community+JHV

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### System Requirements/Dependencies
What things you need to install the software and how to install them

* Java Spring/mvn
* npm

### Installation
```
# Map Editor Front End
cd map-editor-react
npm install
```

### Starting the server
```
# Backend
cd virtualcommunity-java
mvn spring-boot:run

# Map Editor Front End
cd map-editor-react
npm run start
```

## Running the tests
### Backend
To run tests and generate a surefire report (so it's easier to see test results)
* `` mvn surefire-report:report``
* Navigate to ``<<project root>>/target/site/surefire-report.html``
    * If the html looks unformatted, you may have to generate the css first using ``mvn site``

To check coverage
* ``mvn test``
* Navigate to ``<<project root>>/target/jacoco-ut/mapeditor/index.html``

### Map Editor Frontend

``npm run test`` will watch for code changes

#### Coverage

``npm run coverage`` does not watch, but generates a coverage report


## Deployment

???? Add additional notes about how to deploy this on a live system

## Built With


## Versioning

We use [SemVer](http://semver.org/) for versioning.
