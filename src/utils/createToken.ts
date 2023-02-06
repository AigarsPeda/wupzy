import { serverEnv } from "env/schema.mjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const jwtSecret = serverEnv.JWT_SECRET || "jwtSecret";

const createToken = (id: string) => {
  const uuid = uuidv4();
  const token = jwt.sign({ uuid, userId: id }, jwtSecret, {
    algorithm: "HS256",
  });

  return token;
};

export default createToken;
