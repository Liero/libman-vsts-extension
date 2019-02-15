import * as path from "path";
import tl = require('azure-pipelines-task-lib/task');
import trm = require('azure-pipelines-task-lib/toolrunner');
import os = require('os');

/**
 * 1. Locates libman cli. if not installed, it will install it using dotnet tool install -g.
 * 2. Sets working directory
 * 3. Runs libman restore
 */
async function run() {
    try {
        console.log('libman vs task');
        //console.log(process.env);
        //inputs:
        const libmanJson = tl.getPathInput('libmanjson', true, true);
        const additionalarguments = tl.getInput('additionalarguments', false);

        //1. Locates libman cli. if not installed, it will install it using dotnet tool install -g.
        const tool: trm.ToolRunner = await getLibmanTool();

        //2. set current directory to libman folder
        console.log(`switching working directory to: ${libmanJson}'s directory`)
        const cwd = path.dirname(libmanJson) || ".";
        tl.cd(cwd);
        
        //3. execute libman restore
        console.log(`restoring in {cwd}`);
        await tool.arg(['restore'])
            .argIf(additionalarguments, additionalarguments)
            .exec();
    }
    catch (err) {
        console.log(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

async function getLibmanTool() {
    let libmanExePath = tl.which('libman');
    if (!libmanExePath){
        console.log("Libman CLI not found. Installing..")
        var dotnet = tl.tool(tl.which('dotnet', true));
        await dotnet.arg(['tool', 'install', '-g', 'Microsoft.Web.LibraryManager.Cli']).exec();
        /*
        tl.which('libman') will not be recognized (see error below), so I have to use os.homedir(() workaround.
        Since you just installed the .NET Core SDK, you will need to reopen terminal before running the tool you installed.
        see: https://github.com/dotnet/cli/issues/8368#issuecomment-369720880
        */
       libmanExePath = os.homedir() + '/.dotnet/tools/libman.exe';
    }
    return tl.tool(libmanExePath);
}

run();