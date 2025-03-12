const intlNumberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatPrice(price: any) {
  const convertPriceNumber = Number(price)
  return intlNumberFormat.format(convertPriceNumber)
}
