import { Router } from "express";
import { BlogController } from "./blog.controller";

export class BlogRouter {
  router: Router;
  blogController: BlogController;

  constructor() {
    //pada constructor ekseskusi codenya beurutan dari paling atas
    this.router = Router();
    this.blogController = new BlogController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/", this.blogController.getBlogs);
  };

  getRouter = () => {
    return this.router;
  };
}
