import { inject, injectable } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import { IEventService } from "../interfaces/services/IEventService";
import { EventMapper } from "../mappers/EventMapper";
import { ObjectId } from "mongodb";

function toObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId format");
  }
  return new ObjectId(id);
}

@injectable()
export class EventController {
  constructor(@inject("EventService") private events: IEventService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
const organizerId = toObjectId((req as any).user.id); 

      const data = req.body;
      console.log(organizerId,'organizerId from the body');
      console.log(data,'data from the body');
      const event = await this.events.create(organizerId, {
        title: data.title,
        description: data.description,
        location: data.location,
        date: new Date(data.date),
      } as any);

      console.log(event,'event is saved in the database');
      res.status(201).json(EventMapper.toResponse(event));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizerId = toObjectId((req as any).user.id);
      const id = toObjectId(req.params.id);
      const patch: any = { ...req.body };
      if (patch.date) patch.date = new Date(patch.date);
      const event = await this.events.update(organizerId, id, patch);
      res.json(EventMapper.toResponse(event));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizerId = toObjectId((req as any).user.id);
      const id = toObjectId(req.params.id);
      await this.events.delete(organizerId, id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toObjectId(req.params.id);
      const event = await this.events.get(id);
      res.json(EventMapper.toResponse(event));
    } catch (err) {
      next(err);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await this.events.list();
      res.json(events.map(EventMapper.toResponse));
    } catch (err) {
      next(err);
    }
  };
}
