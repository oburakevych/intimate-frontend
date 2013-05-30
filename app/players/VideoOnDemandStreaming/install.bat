@ECHO OFF
echo Installing VideoOnDemandStreaming...
xcopy "%WMSAPP_HOME%\examples\VideoOnDemandStreaming\conf" "%WMSAPP_HOME%\conf" /s  /Y  /Q > NUL
IF NOT EXIST "%WMSAPP_HOME%\applications\vod" mkdir "%WMSAPP_HOME%\applications\vod"
IF NOT "%1" == "all" pause
