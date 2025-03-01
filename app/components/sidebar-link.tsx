"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { QuickSearchOptions } from "../data/list-quick-search"
import { Button } from "./ui/button"
import { SheetClose } from "./ui/sheet"

const SidebarLink = ({ title, imageUrl }: QuickSearchOptions) => {
  const router = useRouter()

  const onNavLinkSearchBarbershops = () => {
    router.push(`/barbershops?service=${title}`)
  }

  return (
    <SheetClose asChild>
      <Button
        className="justify-start gap-2"
        variant="ghost"
        onClick={onNavLinkSearchBarbershops}
      >
        <Image src={imageUrl} alt={title} width={16} height={16} />
        {title}
      </Button>
    </SheetClose>
  )
}

export default SidebarLink
