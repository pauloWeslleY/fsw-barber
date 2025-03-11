import { Decimal } from "@prisma/client/runtime/library"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { getListBooking } from "./_actions/get-bookings"
import BarbershopItem from "./components/barbershop-item"
import BookingItem from "./components/booking-item"
import Header from "./components/header"
import InputSearch from "./components/input-search"
import { Button } from "./components/ui/button"
import { loadQuickSearchOptions } from "./data/list-quick-search"
import { authOptions } from "./lib/auth"
import { db } from "./lib/prisma"

const getBarberShop = async () => {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return {
    barbershops,
    popularBarbershops,
    user: session?.user,
  }
}

const Home = async () => {
  const { barbershops, popularBarbershops, user } = await getBarberShop()
  const bookings = await getListBooking()

  const confirmedBookings = bookings.filter(
    (booking) => booking.date >= new Date(),
  )

  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="p-5">
        {/* HEADER */}
        <h2 className="text-xl font-bold">
          {user ? `Olá, ${user.name}` : "Seja bem vindo"}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}{" "}
          </span>
          de{" "}
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}.
          </span>
        </p>

        {/* BUSCA */}
        <div className="mt-6">
          <InputSearch />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {loadQuickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant="secondary"
              className="flex items-center gap-2"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGE BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-pizza.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <div>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamento
          </h2>

          <div className="space-y-6">
            {confirmedBookings.slice(0, 1).map((booking) => (
              <BookingItem
                key={booking.id}
                booking={{
                  ...booking,
                  service: {
                    ...booking.service,
                    price: new Decimal(booking.service.price),
                  },
                }}
              />
            ))}
          </div>
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
