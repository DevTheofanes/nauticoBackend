import * as Yup from "yup";
import { parseISO, isBefore, isAfter } from "date-fns";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Review from "../models/Review";
import Vessel from "../models/Vessel";

export default {
  async create(request: Request, response: Response) {
    const reviewsRepository = getRepository(Review);
    const vesselRepository = getRepository(Vessel);

    const schema = Yup.object().shape({
      vesselId: Yup.number().required(),
      lastReview: Yup.date().required(),
      engineHour: Yup.string().required(),
      firm: Yup.string().required(),
      nextReview: Yup.date().required(),
      expert: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const {
      vesselId,
      lastReview,
      engineHour,
      firm,
      nextReview,
      expert,
    } = request.body;

    const vesselExists = await vesselRepository.findOne({
      where: { id: vesselId },
    });

    if (!vesselExists) {
      return response.status(400).json({ error: "Embarcação não encontrada" });
    }

    const lastReviewParsed = parseISO(lastReview);
    const nextReviewParsed = parseISO(nextReview);
    const nowDate = new Date();

    if (isBefore(nextReviewParsed, nowDate)) {
      return response.status(400).json({
        error: "A data para a proxima revisão já passou, tente novamente!",
      });
    }

    if (isAfter(lastReviewParsed, nowDate)) {
      return response.status(400).json({
        error:
          "A data para a ultima revisão ainda não passou, tente novamente!",
      });
    }

    const review = reviewsRepository.create({
      vesselId,
      lastReview: lastReviewParsed,
      engineHour,
      firm,
      nextReview: nextReviewParsed,
      expert,
      created: nowDate,
    });

    await reviewsRepository.save(review);

    return response.status(201).json(review);
  },

  async index(request: Request, response: Response) {
    const { id } = request.params;
    const reviewsRepository = getRepository(Review);

    const reviews = await reviewsRepository.find({
      where: { vesselId: id },
    });

    return response.json(reviews);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const reviewsRepository = getRepository(Review);

    const schema = Yup.object().shape({
      lastReview: Yup.date().required(),
      engineHour: Yup.string().required(),
      firm: Yup.string().required(),
      nextReview: Yup.date().required(),
      expert: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: "Validation Fails" });
    }

    const review = await reviewsRepository.findOne({ where: { id } });

    if (!review) {
      return response.status(400).json({ error: "Revisão não encontrada." });
    }

    const {
      vesselId,
      lastReview,
      engineHour,
      firm,
      nextReview,
      expert,
    } = request.body;

    const lastReviewParsed = parseISO(lastReview);
    const nextReviewParsed = parseISO(nextReview);
    const nowDate = new Date();

    if (isBefore(nextReviewParsed, nowDate)) {
      return response.status(400).json({
        error: "A data para a proxima revisão já passou, tente novamente!",
      });
    }

    if (isAfter(lastReviewParsed, nowDate)) {
      return response.status(400).json({
        error:
          "A data para a ultima revisão ainda não passou, tente novamente!",
      });
    }

    reviewsRepository.merge(review, {
      vesselId,
      lastReview: lastReviewParsed,
      engineHour,
      firm,
      nextReview: nextReviewParsed,
      expert,
    });

    const reviewEdited = await reviewsRepository.save(review);

    return response.status(201).json(reviewEdited);
  },

  async delete(request: Request, response: Response) {
    const reviewRepository = getRepository(Review);

    const { id }: any = request.params;

    if (!request.useMaster && !request.useEmployee) {
      return response
        .status(401)
        .json({ error: "Usuarios não podem acessar essa rota" });
    }

    const review = await reviewRepository.findOne({ where: { id } });
    if (!review) {
      return response.status(400).json({ error: "Revisão não encontrada!" });
    }

    const deleteReview = await reviewRepository.delete(id);

    return response.json(deleteReview);
  },
};
