"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const botconfig_json_1 = require("./botconfig.json");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
    client.on('ready', () => {
        var _a;
        console.log("Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username));
    });
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === "ping") {
            yield interaction.reply("Pong!!!!!!!");
        }
    }));
    client.login(botconfig_json_1.token);
}))();
