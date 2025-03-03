import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import PhoneItem from "@/app/components/phone-item"
import ServiceItem from "@/app/components/service-item"
import SideBar from "@/app/components/sidebar"
import { Button } from "@/app/components/ui/button"
import { Sheet, SheetTrigger } from "@/app/components/ui/sheet"
import { db } from "@/app/lib/prisma"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

async function getDetailBarbershop(id: string) {
  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })

  if (!barbershop) return null

  const barberShop = {
    ...barbershop,
    services: barbershop.services.map((barberService) => {
      return {
        ...barberService,
        price: Number(barberService.price),
      }
    }),
  }

  return barberShop
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getDetailBarbershop(params.id)

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBar />
        </Sheet>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">Serviços</h2>

        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

      <div className="mb-5 space-y-3 p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">Contatos</h2>

        <div className="space-y-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
