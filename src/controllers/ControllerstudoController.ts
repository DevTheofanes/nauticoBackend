import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Users from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as crypto from "crypto";

import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const usersRepository = getRepository(Users);
    const { name, email, password, phone, employee } = request.body;

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      return response.status(400).json({ error: "Usuario já existe!" });
    }

    if (!request.useMaster) {
      return response.status(401).json({
        error: "Somente Adminstradores podem criar esse tipo de usuario!",
      });
    }

    const data = {
      name,
      email,
      password,
      phone,
      employee,
      master: false,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      email: Yup.string().required("email obrigatório"),
      password: Yup.string().required("senha obrigatório").max(6),
      phone: Yup.string().required("celular obrigatório"),
      employee: Yup.boolean().required("Cargo obrigatório"),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    await schema.validate(data, {
      abortEarly: false,
    });

    const users = usersRepository.create(data);
    await usersRepository.save(users);

    return response.status(201).json(users);
  },

  //login controller

  async login(request: Request, response: Response) {
    const repository = getRepository(Users);

    const { email, password } = request.body;
    const users = await repository.findOne({ where: { email } });
    if (!users) {
      return response.sendStatus(401);
    }
    const isValidPassword = await bcrypt.compare(password, users.password);
    if (!isValidPassword) {
      return response.sendStatus(201);
    }
    const token = jwt.sign({ id: users.id, master: users.master }, "secret", {
      expiresIn: "1d",
    });
    return response.json({ users, token });
  },

  //Recuperar senha

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;
    try {
      const reps = getRepository(Users);
      const user = await reps.findOne({
        email: email,
      });

      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3269e52c658db7",
          pass: "243fdbc6adba5b",
        },
      });

      const newPassword = crypto.randomBytes(4).toString("hex");
      let password = await bcrypt.hash(newPassword, 8);

      if (user) {
        let r = await transport.sendMail({
          from: "Administrador <0ae140a8d7-581724@inbox.mailtrap.io>",
          to: email,
          subject: "Recuperação de Senha!",
          html: `<p>Olá sua nova senha para acessa o aplicativo nautico é:${newPassword}</p></br><a>Sistema</a>`,
        });

        user.password = password;
        await reps.save(user);
      } else {
        return response.status(404).json({ message: "User Not found" });
      }

      // getRepository(Users).update(user,{
      //   password
      //  }).then(
      //   () => {
      //   return response.status(200).json({ message: 'Email send' })
      //   }
      //  ).catch(
      //   () =>{
      //   return response.status(401).json({ message: 'Email error' })
      //   }
    } catch (error) {
      return response.status(401).json({ message: "Faild to send" });
    }
  },
};
