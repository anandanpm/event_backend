import { IsInt, IsPositive, IsString, Min } from "class-validator"

export class CreateTicketDto {
  @IsString()
  name!: string

  @IsInt()
  @IsPositive()
  priceCents!: number

  @IsInt()
  @Min(1)
  totalQuantity!: number
}
