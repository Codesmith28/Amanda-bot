import fs from "fs";
import path from "path";

// A very important function which will give us all the files/folders of the required folder.
export default function getAllFiles(
  directory: string,
  foldersOnly: boolean = false
): string[] {
  let fileNames: string[] = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
}
