import * as crypto from "node:crypto";

function generateCodeVerifier() {
    const codeVerifier = crypto.randomBytes(64).toString('hex');
    return codeVerifier;
}

function generateCodeChallenge(codeVerifier) {
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest();
    return codeChallenge.toString('base64url');
}

export { generateCodeVerifier, generateCodeChallenge };
