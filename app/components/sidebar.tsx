import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { loadQuickSearchOptions } from "../data/list-quick-search"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

const SideBar = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="font-bold">Olá, faça seu login</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>

            <Button variant="outline" className="gap-2 font-bold">
              <Image
                src="/btn-google.svg"
                alt="Logo do google"
                width={18}
                height={18}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar className="h-12 w-12 border-2 border-solid border-primary">
          <AvatarImage src="/account.png" alt="Avatar" />
        </Avatar>

        <div className="space-y-1">
          <p className="font-bold">John Doe</p>
          <span className="text-xs">johndoe@gmail.com</span>
        </div> */}
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
        {loadQuickSearchOptions.map((option) => (
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
