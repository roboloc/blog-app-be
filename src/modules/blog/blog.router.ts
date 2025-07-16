import { Router } from "express";
import { BlogController } from "./blog.controller";
import { UploaderMiddleware } from "../../middlewares/uploader.middleware";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";
import { JWT_SECRET } from "../../config/env";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { validateBody } from "../../middlewares/validation.middleware";

export class BlogRouter {
  private router: Router;
  private blogController: BlogController;
  private jwtMiddleware: JwtMiddleware;
  private uploaderMiddleware: UploaderMiddleware;

  constructor() {
    //pada constructor ekseskusi codenya beurutan dari paling atas
    this.router = Router();
    this.jwtMiddleware = new JwtMiddleware();
    this.blogController = new BlogController();
    this.uploaderMiddleware = new UploaderMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/", this.blogController.getBlogs);
    this.router.get("/:slug", this.blogController.getBlogBySlug);
    //menggunakan uploader middleware pada router
    this.router.post(
      "/",
      //pengecekan apakah user sudah login atau belum
      this.jwtMiddleware.verifyToken(JWT_SECRET!),
      //megnecek front end middleware yang akan membindahkan ke validate body
      this.uploaderMiddleware
        .upload()
        .fields([{ name: "thumbnail", maxCount: 1 }]),
      this.uploaderMiddleware.fileFilter([
        "image/jpeg",
        "image/png",
        "image/avif",
      ]),
      // untuk melihat request body
      validateBody(CreateBlogDTO),
      this.blogController.createBlog
    );
  };

  getRouter = () => {
    return this.router;
  };
}
