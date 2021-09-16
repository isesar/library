import { Router } from "express";
import AuthorController from "./controllers/AuthorController";
import FormatController from "./controllers/FormatController";
import TitleController from "./controllers/TitleController";



const routes = Router();


routes.post('/author',AuthorController.store)
routes.get('/author',AuthorController.index);
routes.get('/author/:id',AuthorController.getAuthorById);
routes.delete('/author/:id',AuthorController.delete);
routes.put('/author/:id',AuthorController.updateAuthor);

routes.post('/author/:id/title',TitleController.createTitle)
routes.get('/title',TitleController.index);
routes.get('/title/:id',TitleController.getTitleById);
routes.delete('/title/:id',TitleController.delete);
routes.put('/title/:id',TitleController.updateTitle)

routes.post('/format',FormatController.store)
routes.get('/format',FormatController.index);
routes.get('/format/:id',FormatController.getFormatById);
routes.delete('/format/:id',FormatController.delete);
routes.put('/format/:id',FormatController.updateFormat)


routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});


export default routes;