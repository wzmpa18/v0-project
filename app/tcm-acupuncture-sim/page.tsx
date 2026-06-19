"use client"

import { useRouter } from "next/navigation"
import { Tcm3DPage } from "@/components/pages/tcm-3d-page"

export default function Page() {
  const router = useRouter()

  return <Tcm3DPage initialTab="acupuncture" onBack={() => router.push("/")} />
}
