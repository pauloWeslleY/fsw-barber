import Image from "next/image"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import useQuickSearch from "../hook/useQuickSearch"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const SideBar = () => {
  const { quickSearchOptions } = useQuickSearch()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar className="h-12 w-12 border-2 border-solid border-primary">
          <AvatarImage src="/account.png" alt="Avatar" />
        </Avatar>

        <div className="space-y-1">
          <p className="font-bold">John Doe</p>
          <span className="text-xs">johndoe@gmail.com</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        <SheetClose asChild>
          <Button asChild className="justify-start gap-2" variant="ghost">
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              src={option.imageUrl}
              alt="Ícone Tesoura"
              width={16}
              height={16}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SideBar
