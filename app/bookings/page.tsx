import { getServerSession } from "next-auth"

import { getListBooking } from "@/app/_actions/get-bookings"
import BookingItem from "@/app/components/booking-item"
import Header from "@/app/components/header"

import { authOptions } from "../lib/auth"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)
  const bookings = await getListBooking()

  const confirmedBookings = bookings.filter(
    (booking) => booking.date > new Date(),
  )

  const concludedBookings = bookings.filter(
    (booking) => booking.date <= new Date(),
  )

  if (!session?.user) {
    return (
      <>
        <Header />

        <div className="p-5 text-center">
          <span className="text-xl font-bold">
            Faça login, visualizar seus agendamentos
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="p-5">
        <h1 className="pb-6 text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos</p>
        )}

        <div className="space-y-3">
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmado
              </h2>

              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
        </div>

        <div className="space-y-3">
          {concludedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalizado
              </h2>

              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
