import { Booking } from "@prisma/client"
import { isPast, isToday, set } from "date-fns"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { createBooking } from "../_actions/create-booking"
import { getBookings } from "../_actions/get-bookings"
import { TIME_LIST } from "../data/time-list"

interface UseServiceItemProps {
  serviceId: string
}

const useServiceItem = ({ serviceId }: UseServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const { data } = useSession()
  const router = useRouter()

  const loadBooking = useCallback(async () => {
    if (!selectedDay) return
    const bookings = await getBookings({ date: selectedDay, serviceId })
    setDayBookings(bookings)
  }, [selectedDay, serviceId])

  useEffect(() => {
    loadBooking()
  }, [loadBooking])

  const selectedDate = useMemo(() => {
    if (!selectedTime || !selectedDay) return
    const hour = selectedTime.split(":")[0]
    const minute = selectedTime.split(":")[1]
    return set(selectedDay, {
      minutes: Number(minute),
      hours: Number(hour),
    })
  }, [selectedDay, selectedTime])

  const getTimeList = useMemo<string[]>(() => {
    if (!selectedDay) return []

    return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0])
      const minutes = Number(time.split(":")[1])
      const hasTimePast = isPast(set(new Date(), { hours: hour, minutes }))

      if (hasTimePast && isToday(selectedDay)) {
        return false
      }

      const hasHourAvailable = dayBookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minutes,
      )

      if (hasHourAvailable) {
        return false
      }

      return true
    })
  }, [dayBookings, selectedDay])

  const hasTimeListCurrent = getTimeList.length > 0

  const handleDateSelect = (date?: Date) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    return () => setSelectedTime(time)
  }

  const handleCreateBooking = async (serviceId: string) => {
    if (!selectedDate) return

    try {
      await createBooking({ serviceId, date: selectedDate })
      toast.success("Create booking successfully", {
        action: {
          label: "Ver Agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
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
    selectedDate,
    dayBookings,
    getTimeList,
    hasTimeListCurrent,
    loadBooking,
    handleCreateBooking,
    handleTimeSelect,
    handleDateSelect,
  }
}

export default useServiceItem
