import * as Yup from "yup";

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Vessel from "../models/Vessel";
import Damaged from "../models/Damaged";
import Review from "../models/Review";
import Schedule from "../models/Schedule";
import Finding from "../models/Finding";
import CheckListE from "../models/CheckListE";
import CheckListJ from "../models/CheckListJ";

export default {
  async create(request: Request, response: Response) {
    const schema = Yup.object().shape({
      jetski: Yup.bool().required("campo obrigatório"),
      name: Yup.string().required("campo obrigatório"),
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
      jetski,
      name,
      proprietario,
      marca,
      modelo,
      ano,
      comprimentototal,
      motor,
      combustivel,
    } = request.body;

    const vesselRepository = getRepository(Vessel);
    const checkListERepository = getRepository(CheckListE);
    const checkListJRepository = getRepository(CheckListJ);

    if (!request.useMaster) {
      return response
        .status(401)
        .json({ error: "Somente Adminstradores podem criar embarcações!" });
    }

    const vessel = vesselRepository.create({
      jetski,
      name,
      proprietario,
      marca,
      modelo,
      ano,
      comprimentototal,
      motor,
      combustivel,
    });
    await vesselRepository.save(vessel);

    if (!vessel.jetski) {
      const check = checkListERepository.create({ vesselId: vessel.id });
      await checkListERepository.save(check);
    }

    if (vessel.jetski) {
      const check = checkListJRepository.create({ vesselId: vessel.id });
      await checkListJRepository.save(check);
    }

    return response.status(201).json(vessel);
  },

  async index(request: Request, response: Response) {
    const vesselsRepository = getRepository(Vessel);

    const allVessels = await vesselsRepository.find();

    const allJetski = await vesselsRepository.find({
      where: { jetski: true },
    });

    const allMotorBoats = await vesselsRepository.find({
      where: { jetski: false },
    });

    return response.json({ allVessels, allJetski, allMotorBoats });
  },

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
      name: Yup.string(),
      proprietario: Yup.string(),
      marca: Yup.string(),
      modelo: Yup.string(),
      ano: Yup.string(),
      comprimentototal: Yup.string(),
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
    } = request.body;

    vesselRepository.merge(vessel, {
      name,
      proprietario,
      marca,
      modelo,
      ano,
      comprimentototal,
    });

    const vesselEdited = await vesselRepository.save(vessel);

    return response.status(200).json(vesselEdited);
  },

  async delete(request: Request, response: Response) {
    const vesselRepository = getRepository(Vessel);
    const reviewsRepository = getRepository(Review);
    const damagedRepository = getRepository(Damaged);
    const scheduleRepository = getRepository(Schedule);
    const findingRepository = getRepository(Finding);
    const checkListERepository = getRepository(CheckListE);
    const checkListJRepository = getRepository(CheckListJ);

    const { id }: any = request.params;

    if (!request.useMaster) {
      return response
        .status(401)
        .json({ error: "Apenas administradores podem acessar essa rota" });
    }

    const vessel = await vesselRepository.findOne({ where: { id } });
    if (!vessel) {
      return response
        .status(400)
        .json({ error: "Essa embarcação não existe!" });
    }

    const deleteReviews = await reviewsRepository.delete({ vesselId: id });
    const deleteDamaged = await damagedRepository.delete({ vesselId: id });
    const deleteSchedules = await scheduleRepository.delete({ vesselId: id });
    const deleteFindings = await findingRepository.delete({ vesselId: id });
    const deleteCheckListE = await checkListERepository.delete({
      vesselId: id,
    });
    const deleteCheckListJ = await checkListJRepository.delete({
      vesselId: id,
    });
    const deleteVessel = await vesselRepository.delete(id);

    return response.json({
      deleteVessel,
      deleteDamaged,
      deleteReviews,
      deleteSchedules,
      deleteFindings,
      deleteCheckListE,
      deleteCheckListJ,
    });
  },
};
