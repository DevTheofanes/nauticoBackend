import { Router } from "express";
import UsersController from "./controllers/UsersController";
import VesselController from "./controllers/VesselController";
import DamagedController from "./controllers/DamagedController";
import ReviewController from "./controllers/ReviewController";
import SchedulesController from "./controllers/SchedulesController";
import FindingsController from "./controllers/FindingsController";
import CheckListController from "./controllers/CheckListController";

import authMiddleware from "./middlewares/authMiddlewe";
import ControllertudoController from "./controllers/ControllerstudoController";

const routes = Router();

//Criação de Master e Login
routes.post("/usersMasters", UsersController.create);
routes.post("/login", UsersController.login);
routes.post("/forgot", UsersController.forgotPassword);

//Criar e ver Funcionarios/Clientes
routes.get("/users", authMiddleware, UsersController.index);
routes.post("/users", authMiddleware, ControllertudoController.create);
routes.put("/users/:id", authMiddleware, UsersController.update);
routes.delete("/users/:id", authMiddleware, UsersController.delete);

//Embarcações
routes.post("/vessels", authMiddleware, VesselController.create);
routes.get("/vessels", authMiddleware, VesselController.index);
routes.put("/vessels/:id", authMiddleware, VesselController.update);
routes.delete("/vessels/:id", authMiddleware, VesselController.delete);

//Avarias
routes.post("/damaged", authMiddleware, DamagedController.create);
routes.get("/damaged/:id", authMiddleware, DamagedController.index);
routes.put("/damaged/:id", authMiddleware, DamagedController.update);
routes.delete("/damaged/:id", authMiddleware, DamagedController.delete);

//Revisões
routes.post("/reviews", authMiddleware, ReviewController.create);
routes.get("/reviews/:id", authMiddleware, ReviewController.index);
routes.put("/reviews/:id", authMiddleware, ReviewController.update);
routes.delete("/reviews/:id", authMiddleware, ReviewController.delete);

//Achados e Perdidos
routes.post(
  "/vessels/:vesselId/findings",
  authMiddleware,
  FindingsController.create
);
routes.get(
  "/vessels/:vesselId/findings",
  authMiddleware,
  FindingsController.show
);
routes.get("/findings", authMiddleware, FindingsController.index);
routes.put("/findings/:id", authMiddleware, FindingsController.update);
routes.delete("/findings/:id", authMiddleware, FindingsController.delete);

//Agendamentos
routes.post(
  "/vessels/:vesselId/schedules",
  authMiddleware,
  SchedulesController.create
);
routes.get(
  "/vessels/:vesselId/schedules",
  authMiddleware,
  SchedulesController.show
);
routes.get("/schedules", authMiddleware, SchedulesController.index);
routes.put("/schedules/:id", authMiddleware, SchedulesController.update);
routes.delete("/schedules/:id", authMiddleware, SchedulesController.delete);

//CheckList
routes.get("/vessels/:id/checkList", authMiddleware, CheckListController.index);
routes.put(
  "/vessels/:id/checkList",
  authMiddleware,
  CheckListController.update
);

export default routes;
