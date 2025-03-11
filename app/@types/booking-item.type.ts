import { Prisma } from "@prisma/client"

export interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true }
      }
    }
  }>
}
