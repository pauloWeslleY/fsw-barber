import { getListBooking } from "@/app/_actions/get-bookings"
import BookingItem from "@/app/components/booking-item"
import Header from "@/app/components/header"

interface VerifyDateBookingProps {
  currentDate: boolean
}

const BookingsPage = async () => {
  const bookings = await getListBooking()

  const verifyDateBooking = ({ currentDate }: VerifyDateBookingProps) => {
    if (currentDate) {
      return bookings.filter((booking) => booking.date > new Date())
    } else {
      return bookings.filter((booking) => booking.date <= new Date())
    }
  }

  return (
    <>
      <Header />

      <div className="p-5">
        <h1 className="pb-6 text-xl font-bold">Agendamentos</h1>

        <div className="space-y-3">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Confirmado
          </h2>

          {verifyDateBooking({ currentDate: true }).map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Finalizado
          </h2>

          {verifyDateBooking({ currentDate: false }).map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
