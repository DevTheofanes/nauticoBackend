import * as Yup from "yup";

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Embarcacoesjetski from "../models/Embarcacoesjetski";

export default {
  async create(request: Request, response: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      proprietario: Yup.string().required("campo obrigatório"),
      marca: Yup.string().required("campo obrigatório"),
      modelo: Yup.string().required("campo obrigatório"),
      ano: Yup.string().required("campo obrigatório"),
      comprimentototal: Yup.string().required("campo obrigatório"),
      motor: Yup.string().required("campo obrigatório"),
      combustivel: Yup.string().required("campo obrigatório"),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const {
      name,
      proprietario,
      marca,
      modelo,
      ano,
      comprimentototal,
      motor,
      combustivel,
    } = request.body;

    const embarcacoesjetskiRepository = getRepository(Embarcacoesjetski);

    if (!request.useMaster) {
      return response
        .status(401)
        .json({ error: "Somente Adminstradores podem criar embarcações!" });
    }

    const embarcacoesjetski = embarcacoesjetskiRepository.create({
      name,
      proprietario,
      marca,
      modelo,
      ano,
      comprimentototal,
      motor,
      combustivel,
    });
    await embarcacoesjetskiRepository.save(embarcacoesjetski);

    return response.status(201).json(embarcacoesjetski);
  },
};
