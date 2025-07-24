import { vibrate } from '@remote/funcs/vibrate'
import { resolveQRCodeScan } from '@remote/helpers/resolveQRCodeScan'
import { useRemote } from '@remote/store'
import { VNode } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

export function QRCodeScanner(): VNode | null {
    const { qrcodeScanResolve } = useRemote()
    const [stream, setStream] = useState<MediaStream | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    const isBarcodeDetectorSupported: boolean = !!window.BarcodeDetector

    const handleCancelClick = () => {
        resolveQRCodeScan(null)
    }

    useEffect(() => {
        if (qrcodeScanResolve === undefined) return
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    width: { ideal: 800 },
                    height: { ideal: 800 },
                    aspectRatio: 1,
                    facingMode: 'environment'
                }
            })
            .then(setStream)
        return () => {
            setStream(null)
        }
    }, [qrcodeScanResolve])

    useEffect(() => {
        if (stream === null) return
        return () => {
            stream.getTracks().forEach((track) => {
                track.stop()
            })
            setStream(null)
        }
    }, [stream])

    useEffect(() => {
        if (videoRef.current === null) return
        const qrcodeDetector: BarcodeDetector = new BarcodeDetector({
            formats: ['qr_code']
        })
        const detectingId: number = window.setInterval(() => {
            if (videoRef.current === null) return
            qrcodeDetector.detect(videoRef.current).then((qrcodes) => {
                qrcodes.forEach((qrcode) => {
                    resolveQRCodeScan(qrcode.rawValue)
                })
            })
        }, 1000)
        return () => {
            window.clearInterval(detectingId)
        }
    }, [videoRef.current])

    if (qrcodeScanResolve === undefined) return null

    return (
        <div className="absolute inset-0 bg-zinc-700/70 px-4 pt-12">
            <div className="overflow-hidden rounded-xl bg-zinc-900">
                <video
                    ref={videoRef}
                    className="aspect-square w-full bg-black"
                    srcObject={stream}
                    autoPlay
                />

                {!isBarcodeDetectorSupported && (
                    <div className="p-2 text-center text-rose-400">
                        Trình duyệt này không hỗ trợ quét mã QR
                    </div>
                )}

                <button
                    className="w-full bg-zinc-900 px-8 py-4 active:bg-zinc-600"
                    onPointerDown={() => vibrate()}
                    onClick={handleCancelClick}
                >
                    Đóng
                </button>
            </div>
        </div>
    )
}
