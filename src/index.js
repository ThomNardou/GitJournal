import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import http from 'http';
import os from 'os'
import { connectToGithub, auth } from './auth/oauth.js';
import {GetAllRepos} from "./services/GetAllRepos.js";
import GetReposCommits from "./services/GetReposCommits.js";
import generateJDT from "./services/GenerateJDT.js";

var TOKEN = "";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const startServer = (mainWindow) => {
  const server = http.createServer( async (req, res) => {
    if (req.url?.startsWith('/redirect')) {
      const url = new URL(req.url, 'http://localhost:3000');

      const token = url.searchParams.get('code');

      try {
        const code = await auth.getToken({
          code: token,
          redirect_uri: 'http://localhost:3000/redirect',
        });
  
        const accessToken = code.token.access_token;

        TOKEN = accessToken
        // fs.writeFileSync('token.json', JSON.stringify(accessToken));
  
        res.end('Token generated');
      }
      catch (error) {
        console.error('Error while generating token:', error);
      }

      server.close();

      mainWindow.loadFile(path.join(__dirname, 'index.html'));
    }
  })

  server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
  });
};


app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
      devTools: true
    },
  });

  mainWindow.webContents.openDevTools();

  connectToGithub(mainWindow);
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('get-repos', (event, args) => {
  return GetAllRepos(TOKEN)
})

ipcMain.handle('get-token', (event, args) => {
  return TOKEN
})

ipcMain.handle('get-commits', async (event, args) => {
    const commits = await GetReposCommits(TOKEN, args.name, args.owner)

    if (commits.length > 0) {
      const hasBeenGenerated = await generateJDT(commits, args.name)

      if (hasBeenGenerated) {
        return `Fichier généré avec succès. Vous pouvez le retrouver dans C:\\Users\\${os.userInfo().username}\\Documents\\${args.name}-JDT.xlsx`
      }
      else {
        return "Erreur lors de la génération du fichier"
      }
    }

})



export { startServer };