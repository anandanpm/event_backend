import { IsDateString, IsString } from "class-validator"

export class CreateEventDto {
  @IsString()
  title!: string

  @IsString()
  description!: string

  @IsString()
  location!: string

  @IsDateString()
  date!: string
}
