import * as fs from "fs";
import * as vscode from "vscode";
export function createNewFile(
  fileName: string,
  filePath: string,
  fileContent: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!checkFileExists(filePath, fileName)) {
      fs.appendFile(`${filePath}/${fileName}`, fileContent, err => {
        if (err) {
          reject(err);
        } else {
          resolve("File Created");
        }
      });
    } else {
      const rewriteFile = vscode.window.createQuickPick();
      rewriteFile.placeholder = "Rewrite Existing Sonar File?";
      rewriteFile.items = [
        {
          label: "Okay",
          detail: "This will rewrite your existing file"
        },
        {
          label: `Please don't`,
          detail: "Backup the existing file and creates a new one"
        }
      ];

      rewriteFile.show();
      rewriteFile.onDidChangeSelection(data => {
        if (data[0].label === "Okay") {
          fs.writeFile(`${filePath}/${fileName}`, fileContent, err => {
            if (err) {
              reject(err);
            } else {
              resolve("File Updated");
            }
          });
        } else {
          fs.renameSync(
            `${filePath}/${fileName}`,
            `${filePath}/${fileName}.bak`
          );
          fs.appendFile(`${filePath}/${fileName}`, fileContent, err => {
            if (err) {
              reject(err);
            } else {
              resolve("File Created");
            }
          });
        }
        rewriteFile.hide();
      });
    }
  });
}

function checkFileExists(path: string, fileName: string): boolean {
  if (fs.existsSync(`${path}/${fileName}`)) {
    return true;
  } else {
    return false;
  }
}
