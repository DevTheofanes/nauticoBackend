
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import RevisaoLancha from '../models/RevisaoLancha';

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
    
     const revisaolanchaRepository = getRepository(RevisaoLancha);
    
     const revisaolancha = revisaolanchaRepository.create({
      lancha,
      date,
      hora,
      responsavel,
      revisao,
      tecnico,
     });
     await revisaolanchaRepository.save(revisaolancha);
    
     return response.status(201).json(revisaolancha);
  }
};