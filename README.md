# SITMUN Demo Application

## Requirements
* Git
* Java 8 release
* Node 8.x (LTS) or greater LTS release

## Build and run (development)
- Clone or download the repository.
- Prepare the environment with `./gradlew assemble`.
- Run `./gradlew bootRun` and open <http://localhost:8080>.
- A test user is available (`admin`:`admin`)

## Build and run in Docker (development)
- Clone or download  the repository.
- Prepare the environment with `./gradlew assemble`.
- Run `./gradlew docker` to build the docker image.
- Run `./gradlew dockerRun` to start the container and open <http://localhost:8080> (wait a few seconds).
- To stop and to remove the container you can run `./gradlew dockerStop`.

## Code development

Run `./build-scripts/build-local.sh`. 
If the build is successful, it will launch a SonarQube analysis in SonarCloud. 
This requires that you have a SonarCloud user added to the SITMUN organization, and a token. 
To create a token, go to your SonarCloud account page, Security tab, and generate one. 
Then create a file in `$HOME/.gradle/gradle.properties` with this line: `systemProp.sonar.login=LONG_CHAR_STRING_THAT_IS_YOUR_SONARCLOUD_TOKEN`. 
If you already had that file, simply add the line to it.
If you the SonarCloud analysis has been properly run, you can see the report by clicking on the quality gate badge above.

## Dependencies
This project depends on these plugins (already considered in the build script):

- [sitmun-plugin-core](https://github.com/sitmun/sitmun-plugin-core)
