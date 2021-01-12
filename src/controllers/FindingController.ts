import * as Yup from "yup";
import { subDays, isBefore } from "date-fns";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Vessel from "../models/Vessel";
import Finding from "../models/Finding";

export default {
  async create(request: Request, response: Response) {
    const findingRepository = getRepository(Finding);
    const vesselRepository = getRepository(Vessel);

    const schema = Yup.object().shape({
      comments: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { vesselId }: any = request.params;
    const { comments } = request.body;

    const vesselExists = await vesselRepository.findOne({
      where: { id: vesselId },
    });

    if (!vesselExists) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const finding = findingRepository.create({
      vesselId,
      comments,
      found: new Date(),
    });

    await findingRepository.save(finding);

    return response.status(201).json(finding);
  },

  async show(request: Request, response: Response) {
    const { vesselId } = request.params;
    const vesselRepository = getRepository(Vessel);

    const vessel = await vesselRepository.find({
      where: { id: vesselId },
    });

    if (!vessel) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const findingRepository = getRepository(Finding);

    const findings = await findingRepository.find({ where: { vesselId } });
    const findingsMonth = [];

    for (const finding in findings) {
      if (Object.prototype.hasOwnProperty.call(findings, finding)) {
        const element = findings[finding];

        const timeParsed = subDays(new Date(), 31);
        if (!isBefore(element.delivered, timeParsed)) {
          findingsMonth.push(element);
        }
      }
    }

    return response.json(findingsMonth);
  },

  async index(request: Request, response: Response) {
    if (!request.useMaster && !request.useEmployee) {
      return response
        .status(400)
        .json({ error: "Clientes não podem acessar essa rota" });
    }

    const findingRepository = getRepository(Finding);

    const findings = await findingRepository.find();

    return response.json(findings);
  },

  async update(request: Request, response: Response) {
    const findingRepository = getRepository(Finding);

    const schema = Yup.object().shape({
      comments: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { id }: any = request.params;
    const { comments } = request.body;

    const finding: any = await findingRepository.findOne({
      id,
    });

    if (!finding) {
      return response.status(400).json({ error: "Item não encontrado" });
    }

    findingRepository.merge(finding, {
      comments,
    });

    await findingRepository.save(finding);

    return response.status(201).json(finding);
  },

  async delete(request: Request, response: Response) {
    const findingRepository = getRepository(Finding);

    const { id }: any = request.params;

    if (!request.useMaster && !request.useEmployee) {
      return response
        .status(401)
        .json({ error: "Usuarios não podem acessar essa rota" });
    }

    const finding = await findingRepository.findOne({ where: { id } });
    if (!finding) {
      return response
        .status(400)
        .json({ error: "Item de achados e perdidos, não encontrado!" });
    }

    const deleteFinding = await findingRepository.delete(id);

    return response.json(deleteFinding);
  },

  async delivered(request: Request, response: Response) {
    const findingRepository = getRepository(Finding);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rg: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { id }: any = request.params;
    const { name, rg } = request.body;

    const finding: any = await findingRepository.findOne({
      id,
    });

    if (!finding) {
      return response.status(400).json({ error: "Item não encontrado" });
    }

    findingRepository.merge(finding, {
      name,
      rg,
      delivered: new Date(),
    });

    await findingRepository.save(finding);

    return response.status(201).json(finding);
  },
};
