import { IsDateString, IsOptional, IsString } from "class-validator"

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsDateString()
  date?: string
}
