'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import html2canvas from 'html2canvas'
import { toast } from 'sonner'

import { progressLocales } from '@/locales/progressLocales'

type UseShareProgressReturn = {
    shareRef: React.MutableRefObject<HTMLDivElement | null>
    isCapturing: boolean
    share: () => Promise<void>
    download: () => Promise<void>
}

export const useShareProgress = ():
    UseShareProgressReturn => {
    const t = useTranslations()
    const shareRef = useRef<HTMLDivElement | null>(null)
    const [isCapturing, setIsCapturing] = useState(false)

    const capture = async () => {
        if (!shareRef.current)
            throw new Error('Share card ref not found')
        return await html2canvas(
            shareRef.current,
            {
                scale: 2,
                useCORS: true
            }
        )
    }

    const share = async () => {
        try {
            setIsCapturing(true)
            const canvas = await capture()
            const blob = await new Promise<Blob>(
                (resolve, reject) => {
                    canvas.toBlob((b) => {
                        if (!b) {
                            reject(
                                new Error(
                                    'Failed to convert image to blob'
                                )
                            )
                        }
                        resolve(b!)
                    })
                }
            )

            const file = new File(
                [blob],
                t(progressLocales.share.filename),
                { type: 'image/png' }
            )

            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file] })
                toast.success(
                    t(progressLocales.share.toastShare)
                )
            } else if (navigator.clipboard?.write) {
                const item = new ClipboardItem(
                    { 'image/png': blob }
                )
                await navigator.clipboard.write([item])
                toast.success(
                    t(progressLocales.share.toastCopied)
                )
            } else {
                throw new Error(
                    'Web Share and Clipboard APIs not available in your browser'
                )
            }
        } catch (error) {
            console.error(
                'Share error:',
                error
            )
            const message = error instanceof Error
                ? error.message
                : 'Failed to share'
            toast.error(message)
        } finally {
            setIsCapturing(false)
        }
    }

    const download = async () => {
        try {
            setIsCapturing(true)
            const canvas = await capture()
            const url = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = url
            link.download = t(progressLocales.share.filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            toast.success(t(progressLocales.share.toastDownloaded))
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'Failed to download'
            toast.error(message)
        } finally {
            setIsCapturing(false)
        }
    }

    return {
        shareRef,
        isCapturing,
        share,
        download
    }
}
