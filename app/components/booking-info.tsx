import { formatPrice } from "@/app/utilities/format-price"

import { Card, CardContent } from "./ui/card"

interface BookingInfoProps {
  name: string
  price: any
  date: string
  hours: string
  barberShopName: string
}

const BookingInfo = ({
  name,
  price,
  date,
  hours,
  barberShopName,
}: BookingInfoProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{name}</h2>

          <p className="text-sm font-bold">{formatPrice(price)}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>

          <p className="text-sm">{date}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{hours}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{barberShopName}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingInfo
