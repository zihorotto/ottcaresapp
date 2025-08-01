/* global process */
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

// Cognito config from env
const COGNITO_POOL_ID = process.env.COGNITO_POOL_ID;
const COGNITO_REGION = process.env.COGNITO_REGION;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;

if (!COGNITO_POOL_ID || !COGNITO_REGION || !COGNITO_CLIENT_ID) {
  throw new Error("Missing Cognito config in environment variables");
}

const client = jwksClient({
  jwksUri: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err || !key) return callback(err || new Error("No signing key found"));
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// POST /api/auth/cognito
router.post("/cognito", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: COGNITO_CLIENT_ID,
      issuer: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}`,
      algorithms: ["RS256"],
    },
    (err, decoded: any) => {
      if (err || !decoded) {
        return res.status(401).json({ error: "Invalid token" });
      }
      // Set session
      (req as any).session.user = {
        sub: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      };
      res.json({ success: true });
    }
  );
});

export default router;
