"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogTextColor_1 = require("../../../../Aki_data/Server/lib/models/spt/logging/LogTextColor"); //Imports text color for logger
class Mod {
    constructor() {
        this.messages = require("../config/messages.json");
    }
    // Code added here will load BEFORE the server has started loading
    postDBLoad(container) {
        //Variables
        const LOADING_MSGS = this.messages.loadingMessages;
        const maxNumberEn = LOADING_MSGS.length;
        const randomNumber = Math.floor(Math.random() * maxNumberEn); //Calculation to generate random number
        const message = LOADING_MSGS[randomNumber]; //Picks a random message from the JSON file
        //Resolve Functions
        const logger = container.resolve("WinstonLogger"); //Get the logger from the server container
        const databaseServer = container.resolve("DatabaseServer");
        //Functions
        logger.logWithColor("Loading: ~| Kitteh's Loading Messages |~", LogTextColor_1.LogTextColor.white); //Notify of mod load
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
module.exports = { mod: new Mod() };
