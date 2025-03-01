"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

const formSearchBarberShopSchema = z.object({
  search: z.string().trim().min(1, "Digite algo para buscar"),
})

interface SearchBarberShopSchema
  extends z.infer<typeof formSearchBarberShopSchema> {}

const InputSearch = () => {
  const formSearchBarberShop = useForm<SearchBarberShopSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSearchBarberShopSchema),
    defaultValues: {
      search: "",
    },
  })

  const router = useRouter()

  const handleSubmitSearchBarberShop = (data: SearchBarberShopSchema) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <Form {...formSearchBarberShop}>
      <form
        onSubmit={formSearchBarberShop.handleSubmit(
          handleSubmitSearchBarberShop,
        )}
        className="flex gap-2"
      >
        <FormField
          name="search"
          control={formSearchBarberShop.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder="Faça sua busca..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}

export default InputSearch
