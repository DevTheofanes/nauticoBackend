
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Agendamento from '../models/Agendamento';

export default {
  async create( request: Request, response: Response ) {
    const {
      date,
      hora,
      obs,
     } = request.body;
    
     const agendamentoRepository = getRepository(Agendamento);
    
     const agendamento = agendamentoRepository.create({
      date,
      hora,
      obs
     });
     await agendamentoRepository.save(agendamento);
    
     return response.status(201).json(agendamento);
  }
};