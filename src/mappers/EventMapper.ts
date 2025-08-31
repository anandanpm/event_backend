import type { Event } from "../models/Event"
export const EventMapper = {
  toResponse(e: Event) {
    return {
      id: e.id.toHexString(),
      title: e.title,
      description: e.description,
      location: e.location,
      date: e.date.toISOString(),
      organizerId: e.organizerId.toHexString(),
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }
  },
}
