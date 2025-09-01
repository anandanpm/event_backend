import { inject, injectable } from "tsyringe"
import type { Request, Response, NextFunction } from "express"
import { ITicketService } from "../interfaces/services/ITicketService"
import { TicketMapper } from "../mappers/TicketMapper"
import { ObjectId } from "mongodb"

@injectable()
export class TicketController {
  constructor(@inject('TicketService') private tickets: ITicketService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = new ObjectId(req.params.eventId)
      const { name, priceCents, totalQuantity } = req.body
      console.log(eventId,name, priceCents, totalQuantity,'ticket details from the body');
      const ticket = await this.tickets.create(eventId, { name, priceCents, totalQuantity } as any)
      console.log(ticket,'ticket is saved in the database');
      res.status(201).json(TicketMapper.toResponse(ticket))
    } catch (err) {
      next(err)
    }
  }

  listByEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = new ObjectId(req.params.eventId)
      const tickets = await this.tickets.listByEvent(eventId)
      res.json(tickets.map(TicketMapper.toResponse))
    } catch (err) {
      next(err)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = new ObjectId(req.params.id)
      console.log(id,'the id is comming ')
      const ticket = await this.tickets.get(id)
      console.log(ticket,'ticket from the database')
      res.json(TicketMapper.toResponse(ticket))
    } catch (err) {
      next(err)
    }
  }
}
