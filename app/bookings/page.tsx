import { getListBooking } from "@/app/_actions/get-bookings"
import BookingItem from "@/app/components/booking-item"
import Header from "@/app/components/header"

const BookingsPage = async () => {
  const bookings = await getListBooking()

  const confirmedBookings = bookings.filter(
    (booking) => booking.date > new Date(),
  )

  const concludedBookings = bookings.filter(
    (booking) => booking.date <= new Date(),
  )

  return (
    <>
      <Header />

      <div className="p-5">
        <h1 className="pb-6 text-xl font-bold">Agendamentos</h1>

        <div className="space-y-3">
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmado
              </h2>

              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
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
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
