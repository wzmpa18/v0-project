"use client"
import { JinQianPage } from "@/components/pages/jinqian-page"
import { useRouter } from "next/navigation"
export default function JinQianRoute() {
  const router = useRouter()
  return <JinQianPage onBack={() => router.back()} />
}
