import { NextFunction, Request, Response } from "express";
import { BlogService } from "./blog.service";
import { GetBlogsDTO } from "./dto/get-blogs.dto";
import { plainToInstance } from "class-transformer";
import { ApiError } from "../../utils/api-error";

export class BlogController {
  blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // pada const quey melakukan validasi yang ada pada dto blog dan dto pagination yang melakukan validasi kembali pada sort order dll
      const query = plainToInstance(GetBlogsDTO, req.query);
      const result = await this.blogService.getBlogs(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const thumbnail = files.thumbnail[0];

      if (!thumbnail) throw new ApiError("thumbnail is required", 400);

      const userId = res.locals.user.id;

      // menggunakan jwt middleware yang menggunakan res.local.user.id

      const result = await this.blogService.createBlog(
        req.body,
        thumbnail,
        userId
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
