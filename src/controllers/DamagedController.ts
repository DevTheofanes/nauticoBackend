import * as Yup from "yup";

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Damaged from "../models/Damaged";
import Vessel from "../models/Vessel";

export default {
  async create(request: Request, response: Response) {
    const schema = Yup.object().shape({
      comments: Yup.string().required("campo obrigatório"),
      vesselId: Yup.number().required("campo obrigatório"),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { comments, vesselId } = request.body;

    const damagedRepository = getRepository(Damaged);
    const vesselRepository = getRepository(Vessel);

    const vessel = await vesselRepository.findOne({
      where: { id: vesselId },
    });
    console.log(vessel);

    if (!vessel) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    // if (!request.useMaster) {
    //   return response
    //     .status(401)
    //     .json({ error: "Somente Adminstradores podem criar embarcações!" });
    // }

    const damaged = damagedRepository.create({ comments, vesselId });
    await damagedRepository.save(damaged);

    return response.status(201).json(damaged);
  },

  async index(request: Request, response: Response) {
    const { id } = request.params;

    const damagedRepository = getRepository(Damaged);
    const vesselRepository = getRepository(Vessel);

    const vessel = await vesselRepository.findOne({
      where: { id: id },
    });

    if (!vessel) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const damaged = await damagedRepository.find({
      where: { vesselId: id },
    });

    return response.status(200).json({ vessel, damaged });
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const damagedRepository = getRepository(Damaged);

    const damaged = await damagedRepository.findOne({
      where: { id: id },
    });

    if (!damaged) {
      return response.status(400).json({ error: "Avaria não encontrada" });
    }

    const schema = Yup.object().shape({
      comments: Yup.string().required("campo obrigatório"),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { comments } = request.body;

    damagedRepository.merge(damaged, { comments });

    const damagedEdited = await damagedRepository.save(damaged);

    return response.json(damagedEdited);
  },
};
