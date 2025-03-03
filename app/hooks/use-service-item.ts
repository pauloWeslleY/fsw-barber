import { Booking } from "@prisma/client"
import { format, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { createBooking } from "../_actions/create-booking"
import { getBookings } from "../_actions/get-bookings"
import { TIME_LIST } from "../data/time-list"

const useServiceItem = (serviceId: string) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const loadBooking = useCallback(async () => {
    if (!selectedDay) return
    const bookings = await getBookings({ date: selectedDay, serviceId })
    setDayBookings(bookings)
  }, [selectedDay, serviceId])

  useEffect(() => {
    loadBooking()
  }, [loadBooking])

  const handleDateSelect = (date?: Date) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    return () => {
      setSelectedTime(time)
    }
  }

  const getTimeList = () => {
    return TIME_LIST.filter((time) => {
      const hour = time.split(":")[0]
      const minute = time.split(":")[1]

      const hasHourAvailable = dayBookings.some(
        (booking) =>
          booking.date.getHours() === Number(hour) &&
          booking.date.getMinutes() === Number(minute),
      )

      if (hasHourAvailable) {
        return false
      }

      return true
    })
  }

  const formatDateService = () => {
    if (!selectedDay) return "Data inválida"
    return format(selectedDay, "d 'de' MMMM", { locale: ptBR })
  }

  const handleCreateBooking = async (serviceId: string) => {
    if (!selectedDay || !selectedTime) return
    try {
      const hour = selectedTime.split(":")[0]
      const minute = selectedTime.split(":")[1]
      const newDate = set(selectedDay, {
        minutes: Number(minute),
        hours: Number(hour),
      })

      await createBooking({
        serviceId,
        date: newDate,
      })
      toast.success("Create booking successfully")
      setSelectedDay(undefined)
      setSelectedTime(undefined)
    } catch (error) {
      console.error(error)
      toast.error("Error creating booking")
    }
  }

  return {
    data,
    selectedDay,
    selectedTime,
    dayBookings,
    getTimeList: getTimeList(),
    loadBooking,
    handleCreateBooking,
    formatDateService,
    handleTimeSelect,
    handleDateSelect,
  }
}

export default useServiceItem
