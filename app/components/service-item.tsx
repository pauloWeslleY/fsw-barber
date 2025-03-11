"use client"

import { Barbershop } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

import { ServiceBarberShop } from "../@types/services-barbershops.type"
import useServiceItem from "../hooks/use-service-item"
import { formatPrice } from "../utilities/format-price"
import BookingInfo from "./booking-info"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
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

interface ServiceItemProps {
  service: ServiceBarberShop
  barbershop: Pick<Barbershop, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const {
    data,
    selectedDay,
    selectedTime,
    getTimeList,
    hasTimeListCurrent,
    handleCreateBooking,
    formatDateService,
    handleTimeSelect,
    handleDateSelect,
  } = useServiceItem({ serviceId: service.id })

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {formatPrice(service.price)}
            </p>

            {data?.user && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col px-0">
                  <SheetHeader className="border-b border-solid pb-4">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div>
                    <div className="border-b border-solid py-5">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                        fromDate={new Date()}
                        styles={{
                          head_cell: {
                            width: "100%",
                            textTransform: "uppercase",
                          },
                          cell: {
                            width: "100%",
                          },
                          button: {
                            width: "100%",
                          },
                          nav_button_previous: {
                            width: "32px",
                            height: "32px",
                          },
                          nav_button_next: {
                            width: "32px",
                            height: "32px",
                          },
                          caption: {
                            textTransform: "uppercase",
                          },
                        }}
                      />
                    </div>

                    {selectedDay && (
                      <div className="flex gap-3 overflow-x-scroll border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                        {hasTimeListCurrent ? (
                          getTimeList.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              className="rounded-full"
                              onClick={handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-sm">
                            Não há horários disponíveis para este dia.
                          </p>
                        )}
                      </div>
                    )}

                    {selectedTime && (
                      <div className="p-5">
                        <BookingInfo
                          name={service.name}
                          price={service.price}
                          date={formatDateService()}
                          hours={selectedTime}
                          barberShopName={barbershop.name}
                        />
                      </div>
                    )}
                  </div>

                  <SheetFooter className="flex-1 justify-self-end px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={() => handleCreateBooking(service.id)}
                        disabled={!selectedDay || !selectedTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
