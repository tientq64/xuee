import { RestEndpointMethodTypes } from '@octokit/rest'

export type Tab = chrome.tabs.Tab
export type TabChangeInfo = chrome.tabs.TabChangeInfo
export type TabMoveInfo = chrome.tabs.TabMoveInfo

export type Window = chrome.windows.Window
export type WindowState = chrome.windows.windowStateEnum

export type MessageSender = chrome.runtime.MessageSender
export type Session = chrome.sessions.Session

export type Gist = RestEndpointMethodTypes['gists']['list']['response']['data'][0]
export type GistFiles = Gist['files']
export type GistFile = GistFiles[string]

export enum GistStatus {
    Unknown = -1,
    NotLoggedIn = 0,
    GetUserCode = 100,
    WaitInputUserCode = 101,
    GetGistId = 102,
    ChooseSyncFromOrTo = 103,
    LoggedIn = 200,
    SyncFromGistSuccess = 240,
    SyncFromGistFailed = 241,
    SyncToGistSuccess = 270,
    SyncToGistFailed = 271,
    SyncingFromGist = 340,
    SyncingToGist = 370,
    LoginFailed = 400
}

export enum SyncMode {
    Pull = 'pull',
    Push = 'push'
}
