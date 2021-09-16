import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Author } from "../entity/Author";
import { Format } from "../entity/Format";
import { Title } from "../entity/Title";

class TitleController {
  async createTitle(req: Request, res: Response) {
    const { isbn, title, description, dateOfPublication, format_ID } = req.body;
    const { id } = req.params;

    const authorRepo = getRepository(Author);
    const author = await authorRepo
      .findOne({ where: { author_ID: id } })
      .catch((err) => console.log(err));

    if (!author) {
      return res.json({
        msg: "Author not found",
      });
    }

    const format = await Format.findOne(format_ID).catch((err) =>
      console.log(err)
    );
    const createdTitle = Title.create({
      isbn,
      title,
      description,
      dateOfPublication,
      authors: [author],
      format: { ...format },
    });

    await createdTitle.save().catch((err) => console.log(err));
    return res.status(201).json(createdTitle);
  }

  async index(req: Request, res: Response) {
    const titleRepo = getRepository(Title);

    const titles = await titleRepo
      .createQueryBuilder("title")
      .leftJoinAndSelect("title.format", "format")
      .leftJoinAndSelect("title.authors", "author")
      .getMany()
      .catch((err) => console.log(err));
    return res.json(titles);
  }

  async getTitleById(req: Request, res: Response) {
    const titleRepo = getRepository(Title);

    const { id } = req.params;
    const title = await titleRepo
      .findOne({
        where: { id },
        relations: ["author"],
      })
      .catch((err) => console.log(err));
    return res.json(title);
  }
  async updateTitle(req: Request, res: Response) {
    const titleRepo = getRepository(Title);

    const { id } = req.params;
    const { title, description, dateOfPublication } = req.body;

    const updatedTitle = await titleRepo.findOne(id);

    updatedTitle.title = title || updatedTitle.title;
    updatedTitle.description = description || updatedTitle.description;
    updatedTitle.dateOfPublication = dateOfPublication || updatedTitle.dateOfPublication;
    await titleRepo.save(updatedTitle).catch((err) => console.log(err));

    return res.json(updatedTitle);
  }
  async delete(req: Request, res: Response) {
    const titleRepo = getRepository(Title);

    const { id } = req.params;

    await titleRepo.delete(id).catch((err) => console.log(err));

    return res.status(200);
  }
}

export default new TitleController();
