const intlNumberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatPrice(price: number) {
  return intlNumberFormat.format(price)
}
