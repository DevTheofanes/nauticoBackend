import { Router } from "express";
import UsersController from "./controllers/UsersController";
import VesselController from "./controllers/VesselController";
import DamagedController from "./controllers/DamagedController";
import ReviewController from "./controllers/ReviewController";
import SchedulesController from "./controllers/SchedulesController";
import FindingsController from "./controllers/FindingsController";
import CheckListController from "./controllers/CheckListController";
// import EmbarcacoeslanchaController from "./controllers/EmbarcacoeslanchaController";
// import EmbarcacoesjetskiController from "./controllers/EmbarcacoesjetskiController";
// import AvariaslanchaController from "./controllers/AvariaslanchaController";
// import AvariasjetskiController from "./controllers/AvariasjetskiController";
// import AchadoslanchaController from "./controllers/AchadoslanchaController";
// import AchadosjetskipController from "./controllers/AchadosjetskipController";
// import RevisaolanchaController from "./controllers/RevisaolanchaController";
// import RevisaojetController from "./controllers/RevisaojetskipController";
// import AgendamentoController from "./controllers/AgendamentoController";
// import AuthController from "./controllers/AuthController";
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

//Avarias
routes.post("/damaged", authMiddleware, DamagedController.create);
routes.get("/damaged/:id", authMiddleware, DamagedController.index);
routes.put("/damaged/:id", authMiddleware, DamagedController.update);

//Revisões
routes.post("/reviews", authMiddleware, ReviewController.create);
routes.get("/reviews/:id", authMiddleware, ReviewController.index);
routes.put("/reviews/:id", authMiddleware, ReviewController.update);

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

//CheckList
routes.get("/vessels/:id/checkList", authMiddleware, CheckListController.index);
routes.put(
  "/vessels/:id/checkList",
  authMiddleware,
  CheckListController.update
);

// //descarte
// routes.post("/auth", authMiddleware, AuthController.authenticate);
// routes.post("/embarcacoes", authMiddleware, EmbarcacoeslanchaController.create);

// routes.post(
//   "/embarcacoesjet",
//   authMiddleware,
//   EmbarcacoesjetskiController.create
// );
// routes.post("/avariaslancha", authMiddleware, AvariaslanchaController.create);
// routes.post("/avariasjetski", authMiddleware, AvariasjetskiController.create);
// routes.post("/achadoslancha", authMiddleware, AchadoslanchaController.create);
// routes.post("/achadosjetskip", authMiddleware, AchadosjetskipController.create);
// routes.post("/revisaolancha", authMiddleware, RevisaolanchaController.create);
// routes.post("/revisaojet", authMiddleware, RevisaojetController.create);
// routes.post("/agendamento", authMiddleware, AgendamentoController.create);

export default routes;
