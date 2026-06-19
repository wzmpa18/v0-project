"use client"

import { useEffect, useState } from "react"
import { buildResourceUrl, getRuntimeConfig } from "@/lib/app-config"

export function ResourceGate() {
  const [resourceHint, setResourceHint] = useState<string>('')

  useEffect(() => {
    const config = getRuntimeConfig()
    setResourceHint(buildResourceUrl('/assets/runtime-manifest.json'))
    if (config.enableEncryptedResources) {
      document.documentElement.dataset.encryptedResources = 'true'
    }
  }, [])

  return <meta name="x-resource-manifest" content={resourceHint} />
}
