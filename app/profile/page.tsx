"use client"

import { ToolPageWrapper } from "@/components/tool-page-wrapper"
import { ProfilePage } from "@/components/pages/profile-page"

export default function ProfilePageRoute() {
  return (
    <ToolPageWrapper title="我的" subtitle="个人中心" theme="amber">
      <ProfilePage />
    </ToolPageWrapper>
  )
}