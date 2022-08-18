import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod"; //Imports interface to load Database from the Server
import { ILogger } from "@spt-aki/models/spt/utils/ILogger"; //Imports console logger
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"; //Imports Database from the Server

class Mod implements IPostDBLoadMod
{

    private messages = require("../config/messages.json");

    // Code added here will load BEFORE the server has started loading
    public postDBLoad(container: DependencyContainer): void 
    {

        //Variables
        const LOADING_MSGS = this.messages.loadingMessages;
        const maxNumberEn = LOADING_MSGS.length;
        const randomNumber = Math.floor(Math.random() * maxNumberEn); //Calculation to generate random number
        const message = LOADING_MSGS[randomNumber]; //Picks a random message from the JSON file

        //Resolve Functions
        const logger = container.resolve<ILogger>("WinstonLogger"); //Get the logger from the server container
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        
        //Functions
        logger.info("Loading: ~| Kitteh's Loading Messages |~"); //Notify of mod load
        

        //Main Logic
        const tables = databaseServer.getTables(); //Get Database from the Server
        const LOCALES_EN = tables.locales.global.en.interface;
        const MENU_EN = tables.locales.menu.en.menu;

        const messageBodyBase = "Profile data loading...";
        LOCALES_EN[messageBodyBase] = message;
        MENU_EN[messageBodyBase] = message;

    }
}

//Compile mod
module.exports = { mod: new Mod() }