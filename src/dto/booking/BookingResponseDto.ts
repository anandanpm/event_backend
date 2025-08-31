export class BookingResponseDto {
  id!: string
  userId!: string
  eventId!: string
  ticketId!: string
  quantity!: number
  amountCents!: number
  status!: string
  paymentIntentId!: string
  createdAt!: string
  updatedAt!: string
}
