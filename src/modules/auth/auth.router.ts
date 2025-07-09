import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middlewares/validation.middleware";
import { LoginDTO } from "./dto/login.dto";

export class AuthRouter {
  router: Router;
  authController: AuthController;

  constructor() {
    //pada constructor ekseskusi codenya beurutan dari paling atas
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      "/login",
      validateBody(LoginDTO),
      this.authController.login
    );
  };

  public getRouter = () => {
    return this.router;
  };
}
