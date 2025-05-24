Set args = WScript.Arguments
If args.Count = 0 Then
    WScript.Quit
End If

Set fso = CreateObject("Scripting.FileSystemObject")
cwd = fso.GetParentFolderName(WScript.ScriptFullName)

url = args.Item(0)
cmd = "cmd /c cd /d """ & cwd & """ && node run.js " & url

Set shell = CreateObject("WScript.Shell")
shell.Run cmd, 0, False
