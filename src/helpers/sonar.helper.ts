import { createNewFile } from "./fs.helper";
import * as vscode from "vscode";

function generateSonar(projType: string): string {
  if (projType === "Angular") {
    return `
    #sonar server credentials
    sonar.host.url= <your-sonar-url>
    sonar.login= <sonar-username>
    sonar.password= <sonar-password>
    
    # Must be unique in a given SonarQube instance
    sonar.projectKey=<add-project-key-here>
    
    
    # This is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
    sonar.projectName= <add-project-name-here>
    
    
    sonar.projectVersion=0.1
    
    # Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
    sonar.sources=src/
    
    
    #send code coverage to sonarqube
    sonar.typescript.lcov.reportPaths=coverage/lcov.info
    
    #exclude Test Files
    sonar.exclusions= */**/*.spec.ts, src/environments/*, src/main.ts, src/karma.conf.js, src/app/app-routing.module.ts, test/
    `;
  } else if (projType === "Node") {
    return `
  #sonar server credentials
  sonar.host.url= <your-sonar-url>
  sonar.login= <sonar-username>
  sonar.password= <sonar-password>
  
  # Must be unique in a given SonarQube instance
  sonar.projectKey=<add-project-key-here>
  
  
  # This is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
  sonar.projectName= <add-project-name-here>
  
  
  sonar.projectVersion=0.1
  
  # Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
  sonar.sources=src/
  
  
  #send code coverage to sonarqube
  sonar.typescript.lcov.reportPaths=coverage/lcov.info
  
  #exclude Test Files
  sonar.exclusions= */**/*.test.ts, test/, */**/*config.ts
  `;
  } else {
    return "Something Went Wrong";
  }
}

export function createSonarPropertiesFile(forType: string) {
  if (vscode.workspace.workspaceFolders !== undefined) {
    if (forType === "Angular") {
    }
    createNewFile(
      "sonar-project.properties",
      vscode.workspace.workspaceFolders[0].uri.fsPath,
      generateSonar(forType)
    )
      .then(data => {
        if (data === "File Created") {
          vscode.window.showInformationMessage(
            "Sonar Properties File is Created. Make the necessary changes."
          );
        } else if (data === "File Updated") {
          vscode.window.showInformationMessage(
            "Sonar Properties File is Resetted"
          );
        }
        console.log("Sonar File Created");
      })
      .catch(err => {
        console.log("Failed to create the sonar file");
      });
  }
}
