import { Router } from "express";
import UserController from "./controllers/UserController";
import VesselController from "./controllers/VesselController";
import DamagedController from "./controllers/DamagedController";
import ReviewController from "./controllers/ReviewController";
import ScheduleController from "./controllers/ScheduleController";
import FindingController from "./controllers/FindingController";
import CheckListController from "./controllers/CheckListController";
import authMiddleware from "./middlewares/authMiddlewe";
import AuthController from "./controllers/AuthController";

const routes = Router();

//Criação de Master
routes.post("/usersMasters", UserController.create);

//Autenticações na Aplicação
routes.post("/login", AuthController.session);
routes.post("/forgot", AuthController.forgotPassword);
routes.post("/verify", AuthController.verifyToken);
routes.use(authMiddleware);
routes.post("/user/:id/changePassword", AuthController.changePassword);

//Criar e ver Funcionarios/Clientes
routes.get("/users", UserController.index);
routes.post("/users", UserController.new);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

//Embarcações
routes.post("/vessels", VesselController.create);
routes.get("/vessels", VesselController.index);
routes.put("/vessels/:id", VesselController.update);
routes.delete("/vessels/:id", VesselController.delete);

//Avarias
routes.post("/damaged", DamagedController.create);
routes.get("/damaged/:id", DamagedController.index);
routes.put("/damaged/:id", DamagedController.update);
routes.delete("/damaged/:id", DamagedController.delete);

//Revisões
routes.post("/reviews", ReviewController.create);
routes.get("/reviews/:id", ReviewController.index);
routes.put("/reviews/:id", ReviewController.update);
routes.delete("/reviews/:id", ReviewController.delete);

//Achados e Perdidos
routes.post("/vessels/:vesselId/findings", FindingController.create);
routes.get("/vessels/:vesselId/findings", FindingController.show);
routes.get("/findings", FindingController.index);
routes.put("/findings/:id", FindingController.update);
routes.delete("/findings/:id", FindingController.delete);

//Agendamentos
routes.post("/vessels/:vesselId/schedules", ScheduleController.create);
routes.get("/vessels/:vesselId/schedules", ScheduleController.show);
routes.get("/schedules", ScheduleController.index);
routes.put("/schedules/:id", ScheduleController.update);
routes.delete("/schedules/:id", ScheduleController.delete);

//CheckList
routes.get("/vessels/:id/checkList", CheckListController.index);
routes.put("/vessels/:id/checkList", CheckListController.update);

export default routes;
