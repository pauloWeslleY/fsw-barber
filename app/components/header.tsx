import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SideBar from "./sidebar"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          alt="FSW - Barber logo"
          src="/logotipo.png"
          width={120}
          height={18}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBar />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
