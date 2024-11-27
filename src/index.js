import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import http from 'http';
import { connectToGithub, generatePAT, auth } from './auth/oauth.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const startServer = () => {
  const server = http.createServer((req, res) => {
    if (req.url?.startsWith('/redirect')) {
      const url = new URL(req.url, 'http://localhost:3000');

      const token = url.searchParams.get('code');

      auth.getToken({
        code: token,
        redirect_uri: 'http://localhost:3000/redirect',
      })
      .then((response) => {
        let pat = response.token.access_token;

        if (pat) {
          console.log('Token:', pat);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(`Token: ${JSON.stringify(pat)}`);
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Token not found');
        }
      })
      .catch((error) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Error: ${error}`);
      });


    }
  })

  server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  try {
    const code = connectToGithub();
    // const token = generatePAT(code);

    console.log('Token:', code);
  }
  catch (error) {
    console.error('Error:', error);
  }

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', startServer);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
