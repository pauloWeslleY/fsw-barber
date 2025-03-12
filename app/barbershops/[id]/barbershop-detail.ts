import { db } from "@/app/lib/prisma"

export const getDetailBarbershop = async (id: string) => {
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
