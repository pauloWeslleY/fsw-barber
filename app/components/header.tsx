import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

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

        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
