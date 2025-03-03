import { BarbershopService } from "@prisma/client"

export interface ServiceBarberShop extends Omit<BarbershopService, "price"> {
  price: number
}
