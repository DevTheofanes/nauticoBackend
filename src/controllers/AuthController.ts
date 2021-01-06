
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



import Users from '../models/Users';

export default {


  async authenticate( request: Request, response: Response ) {

    const repository = getRepository(Users);

    const { email, password} = request.body;

  

     const users = await repository.findOne({ where:{email} });


     if(!users) {
       return response.sendStatus(201)
     }

     const isValidPassword = await bcrypt.compare(password, users.password);

     if(!isValidPassword){
       return response.sendStatus(401);
     }

     const token = jwt.sign({ id: users.id,master:users.master}, 'secret', { expiresIn: '1d'});

     return response.json({
       users,
       token
     });
 
  }
};