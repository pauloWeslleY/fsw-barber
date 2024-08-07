import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="flex items-center justify-start pt-5">
        <CardContent>
          <p className="text-sm font-bold text-gray-400">
            © 2023 Copyright FSW Barber
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
