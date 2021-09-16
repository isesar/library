import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Author } from "../entity/Author";
import { Title } from "../entity/Title";
class AuthorController {
  async store(req: Request, res: Response) {
    const { firstName, lastName, email, phoneNumber, title } = req.body;
    const authorRepo = getRepository(Author);

    const titleToAdd = await Title.findOne({
      where: { title_ID: title },
    }).catch((err) => console.log(err));

    const author = titleToAdd
      ? authorRepo.create({
          firstName,
          lastName,
          email,
          phoneNumber,
          titles: [titleToAdd],
        })
      : authorRepo.create({
          firstName,
          lastName,
          email,
          phoneNumber
        });
    await authorRepo.save(author).catch((err) => console.log(err));
    return res.status(201).json(author);
  }

  async index(req: Request, res: Response) {
    const authorRepo = getRepository(Author);

    const authors = await authorRepo
      .createQueryBuilder("author")
      .leftJoinAndSelect("author.titles", "title")
      .getMany()
      .catch((err) => console.log(err));

    return res.json(authors);
  }

  async getAuthorById(req: Request, res: Response) {
    const authorRepo = getRepository(Author);

    const { id } = req.params;
    const author = await authorRepo
      .findOne({
        where: { id },
        relations: ["titles_authors"],
      })
      .catch((err) => console.log(err));

    return res.json(author);
  }

  async updateAuthor(req: Request, res: Response) {
    const authorRepo = getRepository(Author);

    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;

    const author = await authorRepo.findOne(id);

    author.firstName = firstName || author.firstName;
    author.lastName = lastName || author.lastName;
    author.email = email || author.email;
    author.phoneNumber = phoneNumber || author.phoneNumber;

    await authorRepo.save(author).catch((err) => console.log(err));

    return res.json(author);
  }
  async delete(req: Request, res: Response) {
    const authorRepo = getRepository(Author);

    const { id } = req.params;

    await authorRepo.delete(id).catch((err) => console.log(err));

    return res.status(200);
  }
}

export default new AuthorController();
