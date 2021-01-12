import * as Yup from "yup";

import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Vessel from "../models/Vessel";

export default {
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const vesselRepository = getRepository(Vessel);

    const vessel = await vesselRepository.findOne({
      where: { id: id },
    });

    if (!vessel) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    if (!request.useMaster && !request.useEmployee) {
      return response
        .status(400)
        .json({ error: "Clientes não podem acessar essa rota" });
    }

    const schema = Yup.object().shape({
      motor: Yup.string().required(),
      combustivel: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { motor, combustivel } = request.body;

    vesselRepository.merge(vessel, {
      motor,
      combustivel,
    });

    const vesselEdited = await vesselRepository.save(vessel);

    return response.status(200).json(vesselEdited);
  },
};
