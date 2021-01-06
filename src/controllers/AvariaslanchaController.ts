import * as Yup from "yup";

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AvariasLancha from "../models/AvariasLancha";

export default {
  async create(request: Request, response: Response) {
    const { obs } = request.body;

    const schema = Yup.object().shape({
      obs: Yup.string().required("Campo obrigatório"),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const avariaslanchaRepository = getRepository(AvariasLancha);

    const avariaslancha = avariaslanchaRepository.create({
      obs,
    });
    await avariaslanchaRepository.save(avariaslancha);

    return response.status(201).json(avariaslancha);
  },
};
