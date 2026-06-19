"use client"

import { useEffect, useState } from "react"
import { OfflineBanner } from "@/components/offline-banner"
import { ResourceGate } from "@/components/resource-gate"

export function AppRuntimeGuard() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    setIsOffline(!navigator.onLine)

    const onOnline = () => setIsOffline(false)
    const onOffline = () => setIsOffline(true)

    window.addEventListener("online", onOnline)
    window.addEventListener("offline", onOffline)

    return () => {
      window.removeEventListener("online", onOnline)
      window.removeEventListener("offline", onOffline)
    }
  }, [])

  return (
    <>
      <ResourceGate />
      {isOffline && <OfflineBanner />}
    </>
  )
}
