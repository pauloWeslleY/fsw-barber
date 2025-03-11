import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true }
      }
    }
  }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        {/* Esquerda */}
        <div className="flex flex-1 flex-col gap-2 py-5 pl-5">
          <Badge
            variant={isConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={booking.service.barbershop.imageUrl}
                alt={booking.service.barbershop.name}
              />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>
        {/* Direita */}
        <div className="flex w-[106px] flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">
            {format(booking.date, "dd", { locale: ptBR })}
          </p>
          <p className="text-sm">
            {format(booking.date, "HH:mm", { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
