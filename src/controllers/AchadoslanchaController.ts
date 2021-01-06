
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import AchadosLancha from '../models/AchadosLancha';



export default {
  async create( request: Request, response: Response ) {
    const {
      date,
      obs,
      entreguei,
      name,
      rg,
     } = request.body;
    
     const achadoslanchaRepository = getRepository(AchadosLancha);
    
     const achadoslancha = achadoslanchaRepository.create({
      date,
      obs,
      entreguei,
      name,
      rg,
     });
     await achadoslanchaRepository.save(achadoslancha);
    
     return response.status(201).json(achadoslancha);
  }
};