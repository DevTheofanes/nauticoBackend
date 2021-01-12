import * as Yup from "yup";
import { parseISO, isBefore, subDays } from "date-fns";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Vessel from "../models/Vessel";
import Schedule from "../models/Schedule";

export default {
  async create(request: Request, response: Response) {
    const scheduleRepository = getRepository(Schedule);
    const vesselRepository = getRepository(Vessel);

    const schema = Yup.object().shape({
      time: Yup.date().required(),
      comments: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { vesselId }: any = request.params;
    const { time, comments } = request.body;

    const vesselExists = await vesselRepository.findOne({
      where: { id: vesselId },
    });

    if (!vesselExists) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const timeParsed = parseISO(time);
    const dateWithSub = subDays(timeParsed, 2);

    if (isBefore(dateWithSub, new Date())) {
      return response.status(400).json({
        error: "Agendamentos apenas com 2 dias de antecedencia.",
      });
    }

    const schedule = scheduleRepository.create({
      vesselId,
      time: timeParsed,
      comments,
    });

    await scheduleRepository.save(schedule);

    return response.status(201).json(schedule);
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

    const scheduleRepository = getRepository(Schedule);

    const schedules = await scheduleRepository.find({ where: { vesselId } });

    return response.json(schedules);
  },

  async index(request: Request, response: Response) {
    if (!request.useMaster && !request.useEmployee) {
      return response
        .status(400)
        .json({ error: "Clientes não podem acessar essa rota" });
    }

    const scheduleRepository = getRepository(Schedule);
    const schedulesNext = [];

    const schedules = await scheduleRepository.find();

    for (const schedule in schedules) {
      if (Object.prototype.hasOwnProperty.call(schedules, schedule)) {
        const element: any = schedules[schedule];
        const timeParsed = subDays(new Date(), 1);
        if (!isBefore(element.time, timeParsed)) {
          schedulesNext.push(element);
        }
      }
    }

    return response.json(schedulesNext);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const scheduleRepository = getRepository(Schedule);
    const schedule: any = await scheduleRepository.findOne({ where: { id } });

    const schema = Yup.object().shape({
      time: Yup.date(),
      comments: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const { time, comments } = request.body;

    const timeParsed = parseISO(time);
    const dateWithSub = subDays(timeParsed, 2);

    if (isBefore(dateWithSub, new Date())) {
      return response.status(400).json({
        error: "Agendamentos apenas com 2 dias de antecedencia.",
      });
    }

    scheduleRepository.merge(schedule, {
      time: timeParsed,
      comments,
    });

    await scheduleRepository.save(schedule);

    return response.status(201).json(schedule);
  },

  async delete(request: Request, response: Response) {
    const scheduleRepository = getRepository(Schedule);

    const { id }: any = request.params;

    const schedule = await scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      return response
        .status(400)
        .json({ error: "Agendamento não encontrado!" });
    }

    const deleteSchedule = await scheduleRepository.delete(id);

    return response.json(deleteSchedule);
  },
};
