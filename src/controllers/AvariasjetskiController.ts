
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import AvariasJetSki from '../models/AvariasJetSkip';



export default {
  async create( request: Request, response: Response ) {
    const {
      obs,
     } = request.body;
    
     const avariasjetskiRepository = getRepository(AvariasJetSki);
    
     const avariasjetski = avariasjetskiRepository.create({
      obs
     });
     await avariasjetskiRepository.save(avariasjetski);
    
     return response.status(201).json(avariasjetski);
  }
};