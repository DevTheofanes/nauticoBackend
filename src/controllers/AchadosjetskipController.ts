
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import AchadosJetSkip from '../models/AchadosJetSkip';



export default {
  async create( request: Request, response: Response ) {
    const {
      date,
      obs,
      entreguei,
      name,
      rg,
     } = request.body;
    
     const achadosjetskiRepository = getRepository(AchadosJetSkip);
    
     const achadosjetskip = achadosjetskiRepository.create({
      date,
      obs,
      entreguei,
      name,
      rg,
     });
     await achadosjetskiRepository.save(achadosjetskip);
    
     return response.status(201).json(achadosjetskip);
  }
};