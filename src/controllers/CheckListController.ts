import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Vessel from "../models/Vessel";
import CheckE from "../models/CheckE";

export default {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const vesselsRepository = getRepository(Vessel);
    const checkRepository = getRepository(CheckE);

    const vesselExists = await vesselsRepository.findOne({
      where: { id },
    });

    if (!vesselExists) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const checkList = await checkRepository.findOne({
      where: { vesselId: id },
    });

    if (!checkList) {
      return response.status(400).json({
        error:
          "CheckList não encontradado, ou não relacionada com essa Embarcação",
      });
    }

    return response.json(checkList);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const vesselRepository = getRepository(Vessel);
    const checkRepository = getRepository(CheckE);

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

    const checkList = await checkRepository.findOne({
      where: { vesselId: id },
    });

    if (!checkList) {
      return response.status(400).json({
        error:
          "CheckList não encontradado, ou não relacionada com essa Embarcação",
      });
    }

    checkRepository.merge(checkList, request.body);

    const checkListEdited = await checkRepository.save(checkList);

    return response.status(200).json(checkListEdited);
  },
};
