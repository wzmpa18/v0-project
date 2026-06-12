"use client"

import { useRouter } from "next/navigation"
import { HomePage } from "@/components/pages/home-page"

export default function Home() {
  const router = useRouter()

  return (
    <HomePage 
      onNavigateToYiXue={() => router.push("/yi-xue")}
      onNavigateToHerbal={() => router.push("/herbal")}
    />
  )
}
