import { Badge } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"

// TODO: receber agendamento como prop
const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamento
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de cabelo</h3>

            <div className="flex items-center">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatar.png" alt="Avatar" />
              </Avatar>
              <p className="text-sm">Vintage Barber</p>
            </div>
          </div>
          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">09:45</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
