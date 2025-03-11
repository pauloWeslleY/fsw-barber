"use client"

import { useState } from "react"
import { toast } from "sonner"

import { deleteBooking } from "@/app/_actions/delete-booking"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface DeleteBookingProps {
  bookingId: string
  // eslint-disable-next-line no-unused-vars
  onCloseSheetBookingItem: (value: boolean) => void
}

const DeleteBooking = ({
  bookingId,
  onCloseSheetBookingItem,
}: DeleteBookingProps) => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(bookingId)
      toast.success("Reserva cancelada como sucesso!")
      setDeleteDialogIsOpen(false)
      onCloseSheetBookingItem(false)
    } catch (error) {
      console.log({ error })
      toast.error("Erro ao cancela reserva, Tente novamente!")
    }
  }

  return (
    <Dialog
      open={deleteDialogIsOpen}
      onOpenChange={(open) => setDeleteDialogIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full rounded-xl">
          Cancelar Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Cancelar Reserva</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar esse agendamento?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex w-full flex-row items-center gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full rounded-xl text-lg">
              Voltar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            className="w-full rounded-xl text-lg"
            onClick={handleCancelBooking}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBooking
