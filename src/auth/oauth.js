import { BrowserWindow } from "electron";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
import { AuthorizationCode } from 'simple-oauth2';
import { startServer } from "../index.js"

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const auth = new AuthorizationCode({
  client: {
    id: clientID,
    secret: clientSecret,
  },
  auth: {
    tokenHost: "https://github.com",
    authorizePath: "/login/oauth/authorize",
    tokenPath: "/login/oauth/access_token",
  }
});

const connectToGithub = async (mainWindow) => {

  const authUri = auth.authorizeURL({
    redirect_uri: "http://localhost:3000/redirect",
    scope: "repo read:user write:repo_hook",
  });

  mainWindow.loadURL(authUri);

  startServer(mainWindow);

}


const generatePAT = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const octokit = new Octokit({
      auth: token,
    });

    const res = await octokit.request("POST /authorizations", {
      scopes: ["repo", "read:user", "write:repo_hook"],
    });

    return res.data.token;
  } catch (error) {
    console.error("Erreur lors de la génération du PAT:", error);
    throw error;
  }
};

export { connectToGithub, auth };
