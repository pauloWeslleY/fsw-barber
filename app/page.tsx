import { SearchIcon } from "lucide-react"
import Image from "next/image"

import BarbershopItem from "./components/barbershop-item"
import BookingItem from "./components/booking-item"
import Header from "./components/header"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { loadQuickSearchOptions } from "./data/list-quick-search"
import { db } from "./lib/prisma"

async function getBarberShop() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return {
    barbershops,
    popularBarbershops,
  }
}

const Home = async () => {
  const { barbershops, popularBarbershops } = await getBarberShop()

  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="p-5">
        {/* HEADER */}
        <h2 className="text-xl font-bold">Hello, John Doe</h2>
        <p className="">Segunda-feria, 05 de agosto</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {loadQuickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Image
                src={option.imageUrl}
                alt="Ícone Tesoura"
                width={16}
                height={16}
              />
              {option.title}
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
        <BookingItem />

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
