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
const distube_1 = require("distube");
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
    new builders_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("use /help to view all commands available")
];
const rest = new rest_1.REST({ version: '9' }).setToken(botconfig_json_1.token);
const whoBirthday = "Thun";
const date = new Date();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const intents = ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"];
    const client = new discord_js_1.Client({ intents: intents });
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({ activities: [{ name: 'together' }], status: 'invisible' });
    const distube = new distube_1.DisTube(client, { searchSongs: 1, searchCooldown: 30, leaveOnEmpty: true, emptyCooldown: 0, leaveOnFinish: true, leaveOnStop: true });
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
        var _b, _c, _d, _e, _f, _g, _h, _j;
        const guildId = (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id;
        const prefix = '$';
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        const status = (queue) => `ความดัง: \`${queue.volume}%\` | ออโต้จูนเสียง: \`${queue.filters.join(', ')
            || 'Off'}\` | วนไหม?: \`${queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'}\` | เล่นเองไหม?: \`${queue.autoplay ? 'On' : 'Off'}\``;
        // DisTube event listeners, more in the documentation page
        distube
            .on('playSong', (queue, song) => queue.textChannel.send(`กำลังเปิดเพลง \`${song.name}\` ความยาวเพลง \`${song.formattedDuration}\`\nโดนสั่งโดย by: ${song.user}\n${status(queue)}`))
            .on('addSong', (queue, song) => queue.textChannel.send(`เพิ่มเพลง ${song.name} - \`${song.formattedDuration}\` ไปยังรายการเปิดเพลง โดย ${song.user}`))
            .on('addList', (queue, playlist) => queue.textChannel.send(`เพิ่มรายการเพลง \`${playlist.name}\` จำนวน (${playlist.songs.length} songs) ไปยังรายการเปิดเพลง\n${status(queue)}`))
            // DisTubeOptions.searchSongs = true
            .on('searchResult', (message, result) => {
            let i = 0;
            message.channel.send(`**Choose an option from below**\n${result
                .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
                .join('\n')}\n*Enter anything else or wait 30 seconds to cancel*`);
        })
            .on('searchCancel', (message) => message.channel.send(`การค้นหา ถูกหยุด`))
            .on('searchInvalidAnswer', (message) => message.channel.send(`searchInvalidAnswer`))
            .on('searchNoResult', (message) => message.channel.send(`ไม่เจออ่ะ`))
            .on('error', (textChannel, e) => {
            console.error(e);
            textChannel.send(`An error encountered: ${e.slice(0, 2000)}`);
        })
            .on('finish', (queue) => { var _a; return (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send('หมดคิวละไปนอนต่อละ'); })
            .on('finishSong', (queue) => { var _a; return (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send('เพลงจบไปแล้ว 1'); })
            .on('disconnect', (queue) => { var _a; return (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send('ไปละ'); })
            .on('empty', (queue) => { var _a; return (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send('Empty!'); });
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
        if (msg.author.bot)
            return;
        if (!msg.content.startsWith(prefix))
            return;
        if (command === "play") {
            if (!((_e = msg.member) === null || _e === void 0 ? void 0 : _e.voice.channel))
                return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if (!args[0])
                return msg.channel.send("เว้นวรรคแล้วใส่ชื่อเพลงด้วย!");
            distube.play(msg, args.join(" "));
        }
        if (command === "stop") {
            const bot = (_f = msg.guild) === null || _f === void 0 ? void 0 : _f.members.cache.get((_g = client.user) === null || _g === void 0 ? void 0 : _g.id);
            if (!((_h = msg.member) === null || _h === void 0 ? void 0 : _h.voice.channel))
                return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if ((bot === null || bot === void 0 ? void 0 : bot.voice.channel) !== ((_j = msg.member) === null || _j === void 0 ? void 0 : _j.voice.channel))
                return msg.channel.send('คุณไม่ได้อยู่ที่เดียวกับบอทนะ');
            distube.stop(msg);
            msg.channel.send('คุณได้หยุดเพลงเรียบร้อย!');
        }
        if (command === "queue") {
            const queue = distube.getQueue(msg);
            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ");
            }
            msg.channel.send('คิวตอนนี้:\n' + queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) ความยาว \`${song.formattedDuration}\``).join("\n"));
        }
        if (command === "skip") {
            const queue = distube.getQueue(msg);
            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ จะข้ามไปไหน?");
            }
            distube.skip(msg);
        }
        if (command === "volume") {
            if (!args[0])
                return msg.reply("กลับไปใส่ระดับเสียงซะ...");
            distube.setVolume(msg, parseInt(args[0]));
            msg.channel.send(`ปรับระดับเสียงเพลงให้้เป็น ${args[0]} แล้วครับ`);
        }
    }));
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _k, _l;
        const channel = client.channels.cache.get("887156603302871110");
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#fff')
            .setTitle(`Happy birthday! ${whoBirthday} 14/9/2021!`)
            .setDescription(`สุขสันต์วันเกิด ${whoBirthday} ขอให้เป็นวันที่ดี มีความสุข แข็ง และอย่าเอา Tom & Jerry ตรูไปทำแบบนนั้นอีก -_-`)
            .setImage("https://cdn.discordapp.com/attachments/841924507261468704/886842358866534491/happybirththun2021.jpg")
            .setTimestamp(new Date().setFullYear(new Date().getFullYear(), botconfig_json_1.birthday.month - 1, botconfig_json_1.birthday.date))
            .addFields({ name: "ชื่อ", value: whoBirthday }, { name: "บุคลิก", value: "หน้าตูด" });
        const embedhelp = new discord_js_1.MessageEmbed()
            .setColor('#fff')
            .setTitle(`Help Center - All commands`)
            .addFields({ name: "Music bot", value: "$play เว้นวรรคตามด้วยชื่อเพลงเพื่อเล่น\n$skip เพื่อข้าม\n$stop เพื่อหยุดเพลง\n $queue เพื่อดูลำดับการเปิดเพลง\n$volume เว้นวรรคตามด้วยระดับเสียงเพืื่อปรับระดับเสียงเพลง" });
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('primary')
            .setLabel('Subscribe')
            .setStyle('PRIMARY'));
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === 'help') {
            return interaction.reply({ embeds: [embedhelp], ephemeral: true });
        }
        // WIP
        if (interaction.channel !== channel) {
            interaction.reply({ content: "You not have permission to access this channel (รอหน่อยเดี๋ยวเปิดให้ใช้กันแล้ว)", ephemeral: true });
            return;
        }
        if (interaction.commandName === 'yt') {
            interaction.reply({ content: 'Subscribe Please', components: [row] });
        }
        if (interaction.commandName === 'birthday') {
            if (date.getDate() === 14) {
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
                yield interaction.reply(`Server name: ${(_k = interaction.guild) === null || _k === void 0 ? void 0 : _k.name}\nTotal members: ${(_l = interaction.guild) === null || _l === void 0 ? void 0 : _l.memberCount}`);
            }
            else if (!interaction.options.getSubcommand()) {
                yield interaction.reply("usage: /about <command>\n\tyourself, server");
            }
        }
    }));
    client.login(botconfig_json_1.token);
}))();
