"use server"

import { endOfDay, startOfDay } from "date-fns"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/lib/auth"
import { db } from "@/app/lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingsProps) => {
  return await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}

export const getListBooking = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  // return bookings.map((booking) => ({
  //   ...booking,
  //   service: {
  //     ...booking.service,
  //     price: Number(booking.service.price),
  //   },
  // }))
}
