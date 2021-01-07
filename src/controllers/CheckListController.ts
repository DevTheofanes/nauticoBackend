import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Vessel from "../models/Vessel";
import CheckListE from "../models/CheckListE";
import CheckListJ from "../models/CheckListJ";

export default {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const vesselsRepository = getRepository(Vessel);
    const checkListERepository = getRepository(CheckListE);
    const checkListJRepository = getRepository(CheckListJ);

    const vesselExists = await vesselsRepository.findOne({
      where: { id },
    });

    if (!vesselExists) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    if (vesselExists.jetski) {
      const checkList = await checkListJRepository.findOne({
        where: { vesselId: id },
      });

      if (!checkList) {
        return response.status(400).json({
          error:
            "CheckList não encontradado, ou não relacionada com essa Embarcação",
        });
      }

      return response.json(checkList);
    } else {
      const checkList = await checkListERepository.findOne({
        where: { vesselId: id },
      });

      if (!checkList) {
        return response.status(400).json({
          error:
            "CheckList não encontradado, ou não relacionada com essa Embarcação",
        });
      }

      return response.json(checkList);
    }
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const vesselRepository = getRepository(Vessel);
    const checkListERepository = getRepository(CheckListE);
    const checkListJRepository = getRepository(CheckListJ);

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

    if (vessel.jetski) {
      const checkList = await checkListJRepository.findOne({
        where: { vesselId: id },
      });

      if (!checkList) {
        return response.status(400).json({
          error:
            "CheckList não encontradado, ou não relacionada com essa Embarcação",
        });
      }

      checkListJRepository.merge(checkList, request.body);

      const checkListEdited = await checkListJRepository.save(checkList);

      return response.status(200).json(checkListEdited);
    } else {
      const checkList = await checkListERepository.findOne({
        where: { vesselId: id },
      });

      if (!checkList) {
        return response.status(400).json({
          error:
            "CheckList não encontradado, ou não relacionada com essa Embarcação",
        });
      }

      checkListERepository.merge(checkList, request.body);

      const checkListEdited = await checkListERepository.save(checkList);

      return response.status(200).json(checkListEdited);
    }
  },
};
