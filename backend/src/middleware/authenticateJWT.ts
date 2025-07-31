/* global process */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// @ts-ignore
import jwksClient from "jwks-rsa";

const cognitoPoolId = process.env.COGNITO_POOL_ID || '';
const cognitoRegion = process.env.COGNITO_REGION || '';
const cognitoIssuer = `https://cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoPoolId}`;

const client = jwksClient({
  jwksUri: `${cognitoIssuer}/.well-known/jwks.json`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err: any, key: any) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    getKey,
    {
      issuer: cognitoIssuer,
      algorithms: ["RS256"],
    },
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Invalid token", details: err?.toString() });
      }
      (req as any).user = decoded;
      next();
    }
  );
}
