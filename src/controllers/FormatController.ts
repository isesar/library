import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Format } from "../entity/Format";

class FormatController {
  async store(req: Request, res: Response) {
    const { format_Code, description, title } = req.body;
    const formatRepo = getRepository(Format);

    const format = formatRepo.create({
      format_Code,
      description,
      titles: [title],
    });
    await formatRepo.save(format).catch((err) => console.log(err));
    return res.status(201).json(format);
  }

  async index(req: Request, res: Response) {
    const formatRepo = getRepository(Format);

    const formats = await formatRepo
      .createQueryBuilder("format")
      .leftJoinAndSelect("format.titles", "title")
      .getMany();

    return res.json(formats);
  }

  async getFormatById(req: Request, res: Response) {
    const formatRepo = getRepository(Format);

    const { id } = req.params;
    const format = await formatRepo
      .findOne({
        where: { id },
        relations: ["title"],
      })
      .catch((err) => console.log(err));

    return res.json(format);
  }

  async updateFormat(req: Request, res: Response) {
    const formatRepo = getRepository(Format);

    const { id } = req.params;
    const { format_Code, description } = req.body;

    const format = await formatRepo.findOne(id);

    format.format_Code = format_Code || format.format_Code;
    format.description = description || format.description;

    await formatRepo.save(format).catch((err) => console.log(err));

    return res.json(format);
  }
  async delete(req: Request, res: Response) {
    const formatRepo = getRepository(Format);

    const { id } = req.params;

    await formatRepo.delete(id).catch((err) => console.log(err));

    return res.status(200);
  }
}

export default new FormatController();
