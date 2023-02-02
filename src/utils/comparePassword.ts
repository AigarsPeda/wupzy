import bcrypt from "bcrypt";

const comparePassword = async (password: string, hash: string) => {
  const isMatch: boolean = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });

  return isMatch;
};

export default comparePassword;
