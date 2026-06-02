"use client"
import { WanNianLiPage } from "@/components/pages/wannianli-page"
import { useRouter } from "next/navigation"
export default function WanNianLiRoute() {
  const router = useRouter()
  return <WanNianLiPage onBack={() => router.back()} />
}
