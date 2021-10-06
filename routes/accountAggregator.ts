import { Request, Response, Router } from "express";
import { getConcent } from "../controllers/aaHandler";


let aaRouter = Router();

aaRouter.post(`/consent`, getConcent);
module.exports = aaRouter;