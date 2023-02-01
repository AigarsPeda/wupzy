import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string | Error> => {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

export default hashPassword;
