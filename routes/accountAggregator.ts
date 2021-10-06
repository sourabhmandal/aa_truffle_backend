import { Request, Response, Router } from "express";
import { getConcent } from "../controllers/aaHandler";

export let aaRouter = Router();

aaRouter.post(`/consent`, getConcent);
