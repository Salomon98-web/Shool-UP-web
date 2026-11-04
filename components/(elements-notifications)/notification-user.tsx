'use client'

import { useState } from "react";
import NotificationsAccept from "./notifications-permission";

export default function NotificationUser(){
  const [openModalNotification, setOpenModalNotification] = useState(true)
  return(
    <NotificationsAccept open={openModalNotification} onOpenchange={setOpenModalNotification} />
  )
}