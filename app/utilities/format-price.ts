import { Decimal } from "@prisma/client/runtime/library"

const intlNumberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatPrice(price: Decimal) {
  const convertPriceNumber = Number(price)
  return intlNumberFormat.format(convertPriceNumber)
}
