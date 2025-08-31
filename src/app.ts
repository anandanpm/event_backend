import "reflect-metadata"
import express from "express"
import cors from "cors"
import { json, urlencoded } from "body-parser"
import { container } from "tsyringe"
import { initContainer } from "./config/container"
import { AppDataSource } from "./config/database"
import authRoutes from "./routes/auth"
import eventRoutes from "./routes/events"
import ticketRoutes from "./routes/tickets"
import bookingRoutes from "./routes/booking"
import stripeRoutes from "./routes/stripe"
import { errorHandler } from "./middleware/errorHandler"

const PORT = process.env.PORT || 4000

async function bootstrap() {
  try {
    initContainer(container)
    await AppDataSource.initialize()
    console.log("[startup] database connected")

    const app = express()

    // Stripe webhook requires raw body for signature verification.
    // We mount JSON after stripe webhook router to avoid body parsing conflicts.
    app.use(cors())

    // Mount stripe webhook route (uses express.raw internally in the router)
    app.use("/api/stripe", stripeRoutes)

    // Standard parsers
    app.use(json())
    app.use(urlencoded({ extended: true }))

    // Health
    app.get("/health", (_req, res) => res.json({ status: "ok" }))

    // Routes
    app.use("/api/auth", authRoutes)
    app.use("/api/events", eventRoutes)
    app.use("/api/tickets", ticketRoutes)
    app.use("/api/bookings", bookingRoutes)

    // Error handling
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
