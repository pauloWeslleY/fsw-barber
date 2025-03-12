import { db } from "@/app/lib/prisma"

import { BarberShopPageProps } from "../@types/barbershop-search.type"

export const getSearchBarberShop = async ({
  searchParams,
}: BarberShopPageProps) => {
  return await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
