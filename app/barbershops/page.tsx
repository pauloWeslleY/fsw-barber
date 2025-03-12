import { getSearchBarberShop } from "../_actions/search-barbershop"
import { BarberShopPageProps } from "../@types/barbershop-search.type"
import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import InputSearch from "../components/input-search"

const BarberShopPage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershops = await getSearchBarberShop({ searchParams })
  const hasBarbershop = barbershops.length > 0

  return (
    <div>
      <Header />

      <div className="p-5">
        <InputSearch />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultado para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>

        <div className="flex flex-row items-center justify-center py-4">
          {!hasBarbershop && (
            <h2 className="text-lg font-bold text-gray-300">
              Busca não encontrada
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
