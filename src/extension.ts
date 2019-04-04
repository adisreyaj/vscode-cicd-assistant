// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {} from "./helpers/fs.helper";
import { createSonarPropertiesFile } from "./helpers/sonar.helper";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "cicd-assistant" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.createSonarFile",
    () => {
      const typeSelection = vscode.window.createQuickPick();
      typeSelection.placeholder = "Select your Project type?";
      typeSelection.items = [
        {
          label: "Angular",
          detail: "Create Sonar file for Angular project"
        },
        {
          label: "Node",
          detail: "Create Sonar file for Node(TS Based) project"
        }
      ];
      typeSelection.show();
      typeSelection.onDidChangeSelection(data => {
        if (data[0].label === "Angular") {
          createSonarPropertiesFile("Angular");
        } else if (data[0].label === "Node") {
          createSonarPropertiesFile("Node");
        }
        typeSelection.hide();
      });
    }
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
