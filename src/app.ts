import "reflect-metadata"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { json, urlencoded } from "body-parser"
import { container } from "tsyringe"
import { initContainer } from "./config/container"
import { AppDataSource } from "./config/database"
import { errorHandler } from "./middleware/errorHandler"

const PORT = process.env.PORT

async function bootstrap() {
  try {
    initContainer(container)
    await AppDataSource.initialize()
    console.log("[startup] database connected")

    const app = express()

    // --- CORS first ---
    app.use(
      cors({
        origin: [process.env.LOCALHOST as string, process.env.FRONTEND_URL as string],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    )

    app.use(cookieParser())

    const stripeRoutes = (await import("./routes/stripe")).default
    app.use("/api/stripe", stripeRoutes)


    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.get("/health", (_req, res) => res.json({ status: "ok" }))

    const authRoutes = (await import("./routes/auth")).default
    const eventRoutes = (await import("./routes/events")).default
    const ticketRoutes = (await import("./routes/tickets")).default
    const bookingRoutes = (await import("./routes/booking")).default

    app.use("/api/auth", authRoutes)
    app.use("/api/events", eventRoutes)
    app.use("/api/tickets", ticketRoutes)
    app.use("/api/bookings", bookingRoutes)

    app.use(errorHandler)

    app.listen(PORT, () => {
      console.log(`[startup] server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("[startup] failed to start app", err)
    process.exit(1)
  }
}

bootstrap()
