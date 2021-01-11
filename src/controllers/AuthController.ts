import * as crypto from "crypto";
import * as Yup from "yup";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import MailerModule from "../modules/mailer";

export default {
  async session(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;
    const user = await repository.findOne({ where: { email } });
    if (!user) {
      return response.status(400).json({ error: "Usuario não já existe!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response
        .status(400)
        .json({ error: "Senha ou Usuario errado, tente novamente" });
    }
    const token = jwt.sign(
      { id: user.id, master: user.master, employee: user.employee },
      "secret",
      {
        expiresIn: "1d",
      }
    );
    return response.json({ user, token });
  },

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { email } });
    if (!user) {
      return response.status(400).json({ error: "Usuario não já existe!" });
    }

    const tokenForUser = crypto.randomBytes(3).toString("hex");

    repository.merge(user, {
      token: tokenForUser,
    });

    await repository.save(user);

    try {
      await MailerModule.sendMail({
        from: "Administrador <0ae140a8d7-581724@inbox.mailtrap.io>",
        to: email,
        subject: "Recuperação de Senha!",
        html: `<p>Olá o seu codigo de acesso para a recuperação de senha é: ${tokenForUser}</p></br><a>Equipe Enos</a>`,
      });

      return response.json({ message: "Email enviado com sucesso" });
    } catch (error) {
      return response.status(401).json({ message: "Faild to send" });
    }
  },

  async verifyToken(request: Request, response: Response) {
    const { email, token } = request.body;
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { email, token } });
    const userTeste = await repository.findOne({ where: { email } });
    if (!user) {
      return response.status(400).json({
        userTeste,
        error: "Usuario não existe, ou o Token está invalido!",
      });
    }

    const tokenForLogin = jwt.sign(
      { id: user.id, master: user.master, employee: user.employee },
      "secret",
      {
        expiresIn: "1d",
      }
    );
    return response.json({ user, tokenForLogin });
    // return response.json(userTeste);
  },

  async changePassword(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    const schema = Yup.object().shape({
      password: Yup.string().max(6).required(),
      confirmPassword: Yup.string().max(6).required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { password, confirmPassword } = request.body;

    if (password !== confirmPassword) {
      return response.status(401).json({
        error: "As senhas não se coicidem",
      });
    }

    userRepository.merge(user, {
      password,
    });

    const userEdited = await userRepository.save(user);

    return response.status(200).json(userEdited);
  },
};
