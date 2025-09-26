'use client'

import React, { useState, useEffect } from 'react'
import { getUniversalLink } from '@selfxyz/core'
import { SelfQRcodeWrapper, SelfAppBuilder, type SelfApp } from '@selfxyz/qrcode'
import { ethers } from 'ethers'
import { useTranslations } from 'next-intl'
import { Shield, CheckCircle, Loader2, Copy, Check } from 'lucide-react'
import { useAccount } from 'wagmi'

interface SelfVerificationButtonProps {
  compact?: boolean
  onVerificationSuccess?: () => void
}

export const SelfVerificationButton: React.FC<SelfVerificationButtonProps> = ({
  compact = false,
  onVerificationSuccess
}) => {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null)
  const [universalLink, setUniversalLink] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const t = useTranslations('verification')
  const tCommon = useTranslations('common')
  const { address } = useAccount()

  // Use connected wallet address or fallback to zero address
  const userId = address || ethers.ZeroAddress

  useEffect(() => {
    // Check if already verified
    const verified = localStorage.getItem('isSelfVerified')
    if (verified === 'true') {
      setIsVerified(true)
    }
  }, [])

  useEffect(() => {
    if (!showQR || !userId) return

    console.log('🚀 Initializing SelfApp for verification...')
    setIsLoading(true)

    try {
      const app = new SelfAppBuilder({
        version: 2,
        appName: process.env.NEXT_PUBLIC_APP_NAME || 'Copoazú Shop',
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || 'copoazu-prod',
        endpoint: process.env.NEXT_PUBLIC_SELF_ENDPOINT || 'https://copoazushop.vercel.app/api/verify',
        logoBase64: 'https://i.postimg.cc/mrmVf9hm/self.png',
        userId: userId,
        endpointType: 'https',
        userIdType: 'hex',
        userDefinedData: 'Verifícate para obtener un descuento 🤑',
        disclosures: {
          excludedCountries: [],
        }
      }).build()

      console.log('✅ SelfApp object built successfully:', app)
      setSelfApp(app)

      const generatedLink = getUniversalLink(app)
      console.log('🔗 Generated Universal Link:', generatedLink)
      setUniversalLink(generatedLink)

      setIsLoading(false)
    } catch (error) {
      console.error('❌ Failed to initialize Self app:', error)
      setIsLoading(false)
    }
  }, [showQR, userId])

  const handleSuccessfulVerification = () => {
    console.log('✅ Verification successful!')
    localStorage.setItem('isSelfVerified', 'true')
    setIsVerified(true)
    setShowQR(false)

    if (onVerificationSuccess) {
      onVerificationSuccess()
    }
  }

  const handleVerifyClick = () => {
    if (!address) {
      console.log('⚠️ No wallet connected')
      return
    }
    setShowQR(true)
  }

  const copyLink = async () => {
    if (universalLink) {
      try {
        await navigator.clipboard.writeText(universalLink)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy link:', error)
      }
    }
  }

  // If already verified, show verified status
  if (isVerified) {
    if (compact) {
      return (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{t('status.verified')}</span>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-200">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">{t('status.verified')}</span>
      </div>
    )
  }

  // Show QR code modal
  if (showQR) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">{t('buttons.verify')}</h2>
            </div>
            <p className="text-gray-600">{t('process.verifyingSubtitle')}</p>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-gray-500">{t('process.verifying')}</p>
              </div>
            </div>
          ) : selfApp ? (
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                <SelfQRcodeWrapper
                  selfApp={selfApp}
                  onSuccess={handleSuccessfulVerification}
                  onError={(error) => {
                    console.error('❌ QR Code Error:', error)
                  }}
                />
              </div>

              {universalLink && (
                <div className="mt-4 w-full">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
                    <span className="text-xs text-gray-600 truncate flex-1">
                      {universalLink}
                    </span>
                    <button
                      onClick={copyLink}
                      className="h-8 w-8 p-0 flex-shrink-0 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {linkCopied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {t('buttons.tryAgain')}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">{t('process.error')}</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowQR(false)}
              className="flex-1 py-3 px-6 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t('buttons.maybeLater')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show verification button
  if (compact) {
    return (
      <button
        onClick={handleVerifyClick}
        disabled={!address}
        className="flex items-center gap-2 px-3 py-2 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Shield className="w-4 h-4" />
        <span>{t('buttons.verify')}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleVerifyClick}
      disabled={!address}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <Shield className="w-5 h-5" />
      <span className="font-medium">{t('buttons.verify')}</span>
    </button>
  )
}