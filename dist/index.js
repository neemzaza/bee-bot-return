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
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
// import * as leaveEvent from "./command/leaveEvent"
require("./about");
const builders_1 = require("@discordjs/builders");
// const token:any = process.env.TOKEN
// Update bot use => "a!updateEventGuildIdEachGuildByMsg!a"
const commands = [
    // About user and server
    new builders_1.SlashCommandBuilder()
        .setName("about")
        .setDescription("use /about to see a full description")
        .addSubcommand(subcmd => subcmd
        .setName("yourself")
        .setDescription("About your discord account")
        .addUserOption(option => option.setName('target').setDescription("This user")))
        .addSubcommand(subcmd => subcmd
        .setName("server")
        .setDescription("About this guild")),
    new builders_1.SlashCommandBuilder()
        .setName("yt")
        .setDescription("View airwavy's youtube channel"),
    new builders_1.SlashCommandBuilder()
        .setName("birthday")
        .setDescription("Happy birthday!!!"),
];
const rest = new rest_1.REST({ version: '9' }).setToken(botconfig_json_1.token);
const whoBirthday = "Thun";
const date = new Date();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const intents = ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"];
    const client = new discord_js_1.Client({ intents: intents });
    client.on("guildMemberRemove", member => {
        var _a;
        const avatar = (_a = member.user) === null || _a === void 0 ? void 0 : _a.avatarURL();
        const channel = client.channels.cache.get("886952139933483009");
        if (!channel)
            return;
        const embed = new discord_js_1.MessageEmbed()
            .setColor("RED")
            .setTitle(`${member.displayName} has left the server`)
            .setThumbnail(avatar);
        channel.send({ embeds: [embed] });
    });
    client.on('ready', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        let allGuildId = client.guilds.cache.map(guild => guild.id);
        console.log(allGuildId);
    }));
    client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d;
        const guildId = (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id;
        if (msg.content === "a!updateEventGuildIdEachGuildByMsg!a") {
            try {
                yield rest.put(v9_1.Routes.applicationGuildCommands(botconfig_json_1.clientId, guildId), //'844398657071480872'
                { body: commands });
                console.log(`Logged into ${(_c = msg.guild) === null || _c === void 0 ? void 0 : _c.name} as ${(_d = client.user) === null || _d === void 0 ? void 0 : _d.tag}`);
            }
            catch (err) {
                console.log("Found error! " + err);
            }
        }
    }));
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({ activities: [{ name: "Airwavy" }], status: 'idle' });
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#fff')
            .setTitle(`Happy birthday! ${whoBirthday} 14/9/2021!`)
            .setDescription(`สุขสันต์วันเกิด ${whoBirthday} ขอให้เป็นวันที่ดี มีความสุข แข็ง และอย่าเอา Tom & Jerry ตรูไปทำแบบนนั้นอีก -_-`)
            .setImage("https://cdn.discordapp.com/attachments/841924507261468704/886842358866534491/happybirththun2021.jpg")
            .setTimestamp(new Date().setFullYear(new Date().getFullYear(), botconfig_json_1.birthday.month - 1, botconfig_json_1.birthday.date))
            .addFields({ name: "ชื่อ", value: whoBirthday }, { name: "บุคลิก", value: "หน้าตูด" });
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('primary')
            .setLabel('Subscribe')
            .setStyle('PRIMARY'));
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === 'yt') {
            interaction.reply({ content: 'Subscribe Please', components: [row] });
        }
        if (interaction.commandName === 'birthday') {
            if (date.getDate() === 13) {
                interaction.reply({ embeds: [embed] });
            }
            else {
                interaction.reply("AH!!");
            }
        }
        if (interaction.commandName === 'about') {
            if (interaction.options.getSubcommand() === "yourself") {
                const user = interaction.options.getUser('target');
                if (user) {
                    yield interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
                }
                else {
                    yield interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
                }
            }
            else if (interaction.options.getSubcommand() === "server") {
                yield interaction.reply(`Server name: ${(_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.name}\nTotal members: ${(_f = interaction.guild) === null || _f === void 0 ? void 0 : _f.memberCount}`);
            }
            else if (!interaction.options.getSubcommand()) {
                yield interaction.reply("usage: /about <command>\n\tyourself, server");
            }
        }
    }));
    client.login(botconfig_json_1.token);
}))();
