import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import InputSearch from "../components/input-search"
import { db } from "../lib/prisma"

interface BarberShopPageProps {
  searchParams: {
    search?: string
  }
}

async function getSearchBarberShop(search?: string) {
  return await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
}

const BarberShopPage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershops = await getSearchBarberShop(searchParams.search)
  const hasBarbershop = barbershops.length > 0

  return (
    <div>
      <Header />

      <div className="p-5">
        <InputSearch />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultado para &quot;{searchParams.search}&quot;
        </h2>

        <div className="flex flex-row items-center justify-center py-4">
          {!hasBarbershop && (
            <h2 className="text-lg font-bold text-gray-300">
              Barbearia não encontrada!
            </h2>
          )}
        </div>

        {hasBarbershop && (
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BarberShopPage
