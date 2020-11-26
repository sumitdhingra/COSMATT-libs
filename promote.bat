@echo off
set DEV_BRANCH="develop"
set STG_BRANCH="staging"
set PROD_BRANCH="master"

set /P ENV="select the environment are you building for? [dev/stg/prod]: "
if "%ENV%"=="dev" (
	set BRANCH=%DEV_BRANCH%
) else if "%ENV%"=="stg" (
	set BRANCH=%STG_BRANCH%
) else if "%ENV%"=="prod" (
	set BRANCH=%PROD_BRANCH%
) else (
	echo "invalid environment"
	exit 0
) 
echo "fetching from origin..."
call git fetch
echo "checking out develop branch..."
call git checkout -f %DEV_BRANCH%
echo "resetting develop branch..."
call git reset --hard origin/%DEV_BRANCH%

echo "checking out branch to be deployed..."
call git checkout -f %BRANCH%
echo "resetting branch..."
call git reset --hard origin/%BRANCH%

if "%ENV%"=="stg" (
	echo "merging develop branch into staging..."
	call git merge %DEV_BRANCH%
) else if "%ENV%"=="prod" (
	echo "merging staging branch into master..."
	call git merge %STG_BRANCH%
)

set /P TAG="Tag name (press enter to skip):"
if not "%TAG%"=="" (
	echo "tagging the branch..."
	call git tag %TAG%
)
echo "pushing the merge commit and tag to origin..."
call git push && git push --tags

echo "deployment completed successfully!"
pause

