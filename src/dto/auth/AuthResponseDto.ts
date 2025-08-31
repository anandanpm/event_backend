export class AuthResponseDto {
  id!: string
  name!: string
  email!: string
  role!: "user" | "admin"
  token!: string
}
