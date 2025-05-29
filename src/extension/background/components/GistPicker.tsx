import { defaultAppDataFilename } from '@background/constants/constants'
import { getFileInGistFiles } from '@background/helpers/getFileInGistFiles'
import { getOctokit } from '@background/helpers/getOctokit'
import { Gist, GistFile } from '@background/types/types'
import { Box } from '@common/components/Box'
import { LinkButton } from '@common/components/LinkButton'
import { Octokit } from '@octokit/rest'
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { VNode } from 'preact'
import { HTMLAttributes } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

const perPage: number = 10

export interface GistPickerProps extends HTMLAttributes<HTMLDivElement> {
    onPick?: (gist: Gist) => void
}

export function GistPicker({ className, onPick, ...props }: GistPickerProps): VNode {
    const [page, setPage] = useState<number>(1)

    const gistList = useRequest(
        async (page: number) => {
            const octokit: Octokit | undefined = getOctokit()
            if (octokit === undefined) return false
            setPage(page)
            return await octokit.gists.list({
                page,
                per_page: perPage
            })
        },
        { manual: true }
    )

    const handleCreateGist = async (): Promise<void> => {
        const octokit: Octokit | undefined = getOctokit()
        if (octokit === undefined) return

        let filename: string | null = prompt('Tên tập tin', defaultAppDataFilename)
        if (filename === null) return

        filename = filename.trim()
        if (filename === '') {
            alert('Tên tập tin không được để trống!')
            return
        }

        let description: string | null = prompt(
            'Mô tả',
            'Tập tin dữ liệu người dùng của ứng dụng Xuee.'
        )
        if (description === null) return

        try {
            const result = await octokit.gists.create({
                files: {
                    [filename]: { content: '{}' }
                },
                description,
                public: false
            })
            const newGist = result.data as Gist
            onPick?.(newGist)
        } catch (error) {
            alert(String(error))
        }
    }

    useEffect(() => {
        gistList.run(page)
        return gistList.cancel
    }, [])

    return (
        <Box {...props} className={clsx(className, 'scheme-dark')}>
            {gistList.loading && <div>Đang lấy danh sách gist...</div>}

            {!gistList.loading && (
                <>
                    {gistList.data === false && <div>Không lấy được danh sách gist!</div>}

                    {!!gistList.data && (
                        <>
                            <div
                                className="w-full flex-1 divide-y divide-zinc-800 overflow-auto
                                    rounded border border-zinc-600 text-left"
                            >
                                {gistList.data.data.map((gist) => {
                                    const file: GistFile = getFileInGistFiles(gist.files)
                                    return (
                                        <div
                                            className="flex cursor-default items-start gap-4 px-4
                                                py-0.5 text-sm hover:bg-zinc-800"
                                        >
                                            <div className="truncate">{file.filename}</div>
                                            <div
                                                className="flex-1 text-right text-xs text-balance
                                                    text-zinc-400"
                                            >
                                                {gist.description}
                                            </div>
                                            <LinkButton onClick={() => window.open(gist.html_url)}>
                                                Xem
                                            </LinkButton>
                                            <LinkButton onClick={() => onPick?.(gist)}>
                                                Chọn
                                            </LinkButton>
                                        </div>
                                    )
                                })}
                            </div>

                            <Box row gap wide>
                                <Box row gap grow>
                                    <LinkButton
                                        disabled={page <= 1}
                                        onClick={() => gistList.run(page - 1)}
                                    >
                                        &lt; Trang trước
                                    </LinkButton>
                                    {'|'}
                                    <LinkButton
                                        disabled={gistList.data.data.length < perPage}
                                        onClick={() => gistList.run(page + 1)}
                                    >
                                        Trang sau &gt;
                                    </LinkButton>
                                </Box>
                                <LinkButton onClick={handleCreateGist}>Tạo mới</LinkButton>
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    )
}
