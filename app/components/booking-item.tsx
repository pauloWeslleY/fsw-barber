"use client"

import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { useState } from "react"

import { BookingItemProps } from "@/app/@types/booking-item.type"

import BookingInfo from "./booking-info"
import DeleteBooking from "./delete-booking"
import PhoneItem from "./phone-item"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)

  const handleSheetIsOpenChange = (isOpen: boolean) => setSheetIsOpen(isOpen)

  return (
    <Sheet open={sheetIsOpen} onOpenChange={handleSheetIsOpenChange}>
      <SheetTrigger asChild>
        <Card className="cursor-pointer">
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
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                  />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
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
      </SheetTrigger>
      <SheetContent className="flex w-[90%] flex-col p-0">
        <SheetHeader className="border-b border-solid p-6">
          <SheetTitle className="text-left">Informacões da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative mt-6 flex h-[180px] w-full items-end rounded-xl">
            <Image
              src="/barber-shop-card.png"
              alt={`Mapa da barbearia ${barbershop.name}`}
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                  />
                </Avatar>

                <div className="">
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-sm">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              variant={isConfirmed ? "default" : "secondary"}
              className="w-fit"
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
          </div>

          <div className="py-3">
            <BookingInfo
              name={booking.service.name}
              price={Number(booking.service.price)}
              date={booking.date}
              barberShopName={barbershop.name}
            />
          </div>

          <div className="mt-3 space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="w-full flex-1 justify-self-end p-5">
          <div className="flex w-full items-center gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full rounded-xl">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <DeleteBooking
                bookingId={booking.id}
                onCloseSheetBookingItem={setSheetIsOpen}
              />
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
