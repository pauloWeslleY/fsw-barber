import { signIn, signOut, useSession } from "next-auth/react"

const useSidebar = () => {
  const { data } = useSession()

  const handleLoginWithGoogle = () => signIn("google")

  const handleLogOutWithGoogle = () => signOut()

  return {
    data,
    handleLoginWithGoogle,
    handleLogOutWithGoogle,
  }
}

export default useSidebar
