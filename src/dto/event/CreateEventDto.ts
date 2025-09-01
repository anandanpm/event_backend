import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString({ message: "Title must be a string" })
  @IsNotEmpty({ message: "Title is required" })
  title!: string;

  @IsString({ message: "Description must be a string" })
  @IsNotEmpty({ message: "Description is required" })
  description!: string;

  @IsString({ message: "Location must be a string" })
  @IsNotEmpty({ message: "Location is required" })
  location!: string;

  @IsDateString({}, { message: "Date must be a valid ISO date string (e.g. 2025-09-01T10:00:00Z)" })
  date!: string;
}
