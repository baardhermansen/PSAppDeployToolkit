function Test-ADTSessionActive
{
	return !!(Get-ADTModuleData).Sessions.Count
}
