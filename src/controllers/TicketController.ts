import { injectable } from "tsyringe"
import type { Request, Response, NextFunction } from "express"
import type { TicketService } from "../services/TicketService"
import { TicketMapper } from "../mappers/TicketMapper"
import { ObjectId } from "mongodb"

@injectable()
export class TicketController {
  constructor(private tickets: TicketService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = new ObjectId(req.params.eventId)
      const { name, priceCents, totalQuantity } = req.body
      const ticket = await this.tickets.create(eventId, { name, priceCents, totalQuantity } as any)
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
      const ticket = await this.tickets.get(id)
      res.json(TicketMapper.toResponse(ticket))
    } catch (err) {
      next(err)
    }
  }
}
