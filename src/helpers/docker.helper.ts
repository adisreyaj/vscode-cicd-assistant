import { createNewFile } from './fs.helper';
import * as vscode from 'vscode';
import { getDockerfile } from '../services/http.service';

async function generateDockerfile(projType: string) {
  return await getDockerfile(projType);
}

export async function createDockerfile(forType: string) {
  if (vscode.workspace.workspaceFolders !== undefined) {
    if (forType === 'Angular') {
    }
    createNewFile(
      'Dockerfile',
      vscode.workspace.workspaceFolders[0].uri.fsPath,
      await generateDockerfile(forType),
    )
      .then((data) => {
        if (data === 'File Created') {
          vscode.window.showInformationMessage(
            'Dockerfile is Created. Make the necessary changes.',
          );
        } else if (data === 'File Updated') {
          vscode.window.showInformationMessage(
            'Dockerfile is Resetted to default',
          );
        }
      })
      .catch((err) => {
        vscode.window.showInformationMessage(
          'Something Went Wrong!..Please try again.',
        );
      });
  }
}
