"use client"

import { SearchIcon } from "lucide-react"

import useInputSearch from "../hooks/use-input-search"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

const InputSearch = () => {
  const { formSearchBarberShop, handleSubmitSearchBarberShop } =
    useInputSearch()

  return (
    <Form {...formSearchBarberShop}>
      <form
        onSubmit={formSearchBarberShop.handleSubmit(
          handleSubmitSearchBarberShop,
        )}
        className="flex gap-2"
      >
        <FormField
          name="title"
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
