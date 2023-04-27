import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import createToken from "utils/createToken";
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET || "jwtSecret";

const EMAIL_USER = {
  user: process.env.EMAIL || "",
  appDomain: process.env.APP_DOMAIN || "",
  password: process.env.EMAIL_PASSWORD || "",
};

export const resetPasswordRouter = createTRPCRouter({
  getResetToken: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await ctx.prisma.passwordReset.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const token = createToken(user.id);

      await ctx.prisma.passwordReset.create({
        data: {
          isActive: true,
          token,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      const transporter = nodemailer.createTransport({
        host: "smtppro.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL_USER.user,
          pass: EMAIL_USER.password,
        },
      });

      await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log("Server is ready to take our messages");
            resolve(success);
          }
        });
      });

      const mailOptions: Mail.Options = {
        to: `${user.email}`, // list of receivers
        from: "wupzy@wupzy.com", // sender address
        subject: "password reset", // Subject line
        text: `${EMAIL_USER.appDomain}/reset-password/${token}`, // www.wupzy.com/reset-password/{TOKEN}/{USER_ID}
        html: `<div> 
                  <h1>Reset Password</h1>
                  <p>Click the link below to reset your password</p>
                  <a href="${EMAIL_USER.appDomain}/reset-password/${token}">Reset Password</a>

                  <p>If you did not request a password reset, please ignore this email.</p>

                  <p>Thanks,</p>
                  <p>Wupzy Team</p>
              </div>`,
      };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.error(error);
      //     return { message: "Error sending email" };
      //   } else {
      //     console.log(`Email sent: ${info.response}`);
      //     return { message: "Reset token sent" };
      //   }
      // });

      await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
            reject(err);

            return { message: "Error sending email" };
          } else {
            console.log(info);
            resolve(info);

            return { message: "Reset token sent" };
          }
        });
      });

      //   await new Promise((resolve, reject) => {
      //     // verify connection configuration
      //     transporter.verify(function (error, success) {
      //         if (error) {
      //             console.log(error);
      //             reject(error);
      //         } else {
      //             console.log("Server is ready to take our messages");
      //             resolve(success);
      //         }
      //     });
      // });

      // return { message: "Reset token sent" };
    }),

  validateToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const resetToken = await ctx.prisma.passwordReset.findUnique({
        where: {
          token: input.token,
        },
      });

      if (!resetToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reset not found",
        });
      }

      const decoded = jwt.verify(resetToken.token, jwtSecret) as {
        userId?: string;
      };

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return { userId: user.id };
    }),
});
