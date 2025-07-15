import { NextFunction, Request, Response } from "express";
import { BlogService } from "./blog.service";
import { GetBlogsDTO } from "./dto/get-blogs.dto";
import { plainToInstance } from "class-transformer";

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
}
