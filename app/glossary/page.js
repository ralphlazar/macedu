'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GlossaryRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/glossary/alevel') }, [router])
  return null
}
