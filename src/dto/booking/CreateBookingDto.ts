import { IsInt, IsMongoId, Min } from "class-validator"

export class CreateBookingDto {
  @IsMongoId()
  ticketId!: string

  @IsInt()
  @Min(1)
  quantity!: number
}
