"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const LogotipoHeader = () => {
  const router = useRouter()

  const onNavigateHome = () => router.push("/")

  return (
    <Image
      alt="FSW - Barber logo"
      src="/logotipo.png"
      width={120}
      height={18}
      className="cursor-pointer"
      onClick={onNavigateHome}
    />
  )
}

export default LogotipoHeader
