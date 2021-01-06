
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import RevisaoJetSkip from '../models/RevisaoJetSkip';

export default {
  async create( request: Request, response: Response ) {
    const {
      lancha,
      date,
      hora,
      responsavel,
      revisao,
      tecnico,
     } = request.body;
    
     const revisaojetskipRepository = getRepository(RevisaoJetSkip);
    
     const revisaojetskip = revisaojetskipRepository.create({
      lancha,
      date,
      hora,
      responsavel,
      revisao,
      tecnico,
     });
     await revisaojetskipRepository.save(revisaojetskip);
    
     return response.status(201).json(revisaojetskip);
  }
};