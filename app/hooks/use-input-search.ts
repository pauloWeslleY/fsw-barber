import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSearchBarberShopSchema = z.object({
  title: z.string().trim().min(1, "Digite algo para buscar"),
})

interface SearchBarberShopSchema
  extends z.infer<typeof formSearchBarberShopSchema> {}

const useInputSearch = () => {
  const formSearchBarberShop = useForm<SearchBarberShopSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSearchBarberShopSchema),
    defaultValues: { title: "" },
  })

  const router = useRouter()

  const handleSubmitSearchBarberShop = (data: SearchBarberShopSchema) => {
    router.push(`/barbershops?title=${data.title}`)
  }

  return {
    handleSubmitSearchBarberShop,
    formSearchBarberShop,
  }
}

export default useInputSearch
