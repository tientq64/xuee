import { syncAppDataFromGist } from '@background/funcs/syncAppDataFromGist'
import { syncAppDataToGist } from '@background/funcs/syncAppDataToGist'
import { getFileInGistFiles } from '@background/helpers/getFileInGistFiles'
import { background, useBackground } from '@background/store'
import { Gist, GistStatus, SyncMode } from '@background/types/types'
import { Box } from '@common/components/Box'
import { Button } from '@common/components/Button'
import { Icon } from '@common/components/Icon'
import { inRange } from '@common/utils/inRange'
import { wait } from '@common/utils/wait'
import { createOAuthDeviceAuth, GitHubAppAuthentication } from '@octokit/auth-oauth-device'
import { VNode } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { ChooseSyncFromOrToGist } from './ChooseSyncFromOrToGist'
import { GistPicker } from './GistPicker'

export function GistAuth(): VNode {
    const { gistStatus, syncFromGistError, syncToGistError } = useBackground()

    const [userCode, setUserCode] = useState<string>('')
    const [authError, setAuthError] = useState<unknown | undefined>(undefined)
    const authWin = useRef<WindowProxy | null>(null)

    const authenticating: boolean = inRange(gistStatus, 100, 199)

    const handleAuthClick = async (): Promise<void> => {
        background.gistStatus = GistStatus.GetUserCode
        const auth = createOAuthDeviceAuth({
            clientType: 'github-app',
            clientId: 'Iv23liSHpoUj2lmEmjTC',
            onVerification: async (verification) => {
                setUserCode(verification.user_code)
                background.gistStatus = GistStatus.WaitInputUserCode
                await wait(2000)
                authWin.current = window.open(verification.verification_uri, '_blank', 'height=700')
            }
        })
        try {
            const tokenAuth: GitHubAppAuthentication = await auth({ type: 'oauth' })
            background.gistToken = tokenAuth.token
            background.gistId = undefined
            background.gistFilename = undefined
            background.needFirstSync = true
            background.gistStatus = GistStatus.GetGistId
        } catch (error) {
            setAuthError(error)
            background.gistStatus = GistStatus.LoginFailed
            throw error
        } finally {
            authWin.current?.close()
        }
    }

    const handleGistPicked = (gist: Gist): void => {
        background.gistId = gist.id
        background.gistFilename = getFileInGistFiles(gist.files).filename
        background.gistStatus = GistStatus.ChooseSyncFromOrTo
    }

    const handleSyncModeChoose = async (syncMode: SyncMode): Promise<void> => {
        background.gistStatus = GistStatus.LoggedIn
        if (syncMode === SyncMode.Pull) {
            await syncAppDataFromGist()
        } else if (syncMode === SyncMode.Push) {
            await syncAppDataToGist()
        }
        background.needFirstSync = false
    }

    useEffect(() => {
        const { gistToken, gistId, gistFilename, needFirstSync } = background
        if (gistToken === undefined) {
            background.gistStatus = GistStatus.NotLoggedIn
        } else if (gistId === undefined || gistFilename === undefined) {
            background.gistStatus = GistStatus.GetGistId
        } else if (needFirstSync) {
            background.gistStatus = GistStatus.ChooseSyncFromOrTo
        } else {
            background.gistStatus = GistStatus.LoggedIn
        }
    }, [])

    return (
        <Box gap={8}>
            {gistStatus === GistStatus.Unknown && (
                <Box className="text-slate-400" gap>
                    <Icon name="help_center" size={40} />
                    Trạng thái chưa xác định
                </Box>
            )}

            {gistStatus === GistStatus.NotLoggedIn && (
                <Box className="text-orange-300" gap>
                    <Icon name="warning" size={40} />
                    Chưa đăng nhập
                </Box>
            )}

            {gistStatus === GistStatus.GetUserCode && (
                <Box gap>
                    <Icon className="animate-spin text-slate-400" name="data_usage" size={40} />
                    Đang lấy mã xác thực...
                </Box>
            )}

            {gistStatus === GistStatus.WaitInputUserCode && (
                <Box gap>
                    <div className="font-mono text-4xl select-all">{userCode}</div>
                    Nhập mã này vào cửa sổ đăng nhập!
                </Box>
            )}

            {gistStatus === GistStatus.GetGistId && (
                <Box gap>
                    <GistPicker
                        className="h-64 max-w-[600px] min-w-full"
                        onPick={handleGistPicked}
                    />
                    Chọn gist dùng để lưu dữ liệu ứng dụng
                </Box>
            )}

            {gistStatus === GistStatus.ChooseSyncFromOrTo && (
                <Box gap>
                    <ChooseSyncFromOrToGist
                        className="max-w-[600px] min-w-full border-b border-zinc-600 pb-2"
                        onChoose={handleSyncModeChoose}
                    />
                    Chọn hành động đồng bộ lần đầu
                </Box>
            )}

            {gistStatus === GistStatus.LoggedIn && (
                <Box className="text-emerald-500" gap>
                    <Icon name="check_circle" size={40} />
                    Đã đăng nhập
                </Box>
            )}

            {gistStatus === GistStatus.SyncFromGistSuccess && (
                <Box className="text-emerald-500" gap>
                    <Icon name="sync_saved_locally" size={40} />
                    Đồng bộ từ GitHub Gist thành công
                </Box>
            )}

            {gistStatus === GistStatus.SyncFromGistFailed && (
                <Box className="text-rose-400" gap>
                    <Icon name="downloading" size={40} />
                    Đồng bộ từ GitHub Gist thất bại
                    <div className="text-xs text-balance">{String(syncFromGistError)}</div>
                </Box>
            )}

            {gistStatus === GistStatus.SyncToGistSuccess && (
                <Box className="text-emerald-500" gap>
                    <Icon name="cloud_done" size={40} />
                    Đồng bộ lên GitHub Gist thành công
                </Box>
            )}

            {gistStatus === GistStatus.SyncToGistFailed && (
                <Box className="text-rose-400" gap>
                    <Icon name="arrow_upload_progress" size={40} />
                    Đồng bộ lên GitHub Gist thất bại
                    <div className="text-xs text-balance">{String(syncToGistError)}</div>
                </Box>
            )}

            {gistStatus === GistStatus.SyncingFromGist && (
                <Box gap>
                    <Icon className="animate-pulse text-slate-400" name="downloading" size={40} />
                    Đang đồng bộ dữ liệu từ GitHub Gist...
                </Box>
            )}

            {gistStatus === GistStatus.SyncingToGist && (
                <Box gap>
                    <Icon
                        className="animate-pulse text-slate-400"
                        name="arrow_upload_progress"
                        size={40}
                    />
                    Đang đồng bộ dữ liệu lên GitHub Gist...
                </Box>
            )}

            {gistStatus === GistStatus.LoginFailed && (
                <Box className="text-rose-400" gap>
                    <Icon name="cancel" size={40} />
                    Đăng nhập thất bại
                    <div className="text-xs text-balance">{String(authError)}</div>
                </Box>
            )}

            <Button disabled={authenticating} onClick={handleAuthClick}>
                Đăng nhập để lưu dữ liệu ứng dụng với GitHub Gist
            </Button>
        </Box>
    )
}
