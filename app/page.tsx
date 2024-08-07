"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Header from "./components/header"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Hello, John Doe</h2>
        <p className="">Segunda-feria, 05 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-pizza.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
