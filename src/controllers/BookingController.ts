import { inject, injectable } from "tsyringe"
import type { Request, Response, NextFunction } from "express"
import type { BookingService } from "../services/BookingService"
import { ObjectId } from "mongodb"
import { BookingMapper } from "../mappers/BookingMapper"

@injectable()
export class BookingController {
  constructor(@inject('BookingService') private bookings: BookingService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new ObjectId(req.body.userId as string)
      const ticketId = new ObjectId(req.body.ticketId)
      const quantity = Number(req.body.quantity)
      console.log(userId,ticketId,quantity,'the details arecomming')
      const { booking, clientSecret } = await this.bookings.createBooking(userId, ticketId, quantity)
      console.log(booking,'booking is saved in the database')
      
      res.status(201).json({ ...BookingMapper.toResponse(booking), clientSecret })
    } catch (err) {
      next(err)
    }
  }


listMine = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userIdString = (req.query.userId as string) 
    const userId = new ObjectId(userIdString)

    console.log(userId, 'userId is coming')

    const bookings = await this.bookings.listForUser(userId)
    console.log(bookings, 'bookings from the database')

    res.json(bookings.map(BookingMapper.toResponse))
  } catch (err) {
    next(err)
  }
}

}
