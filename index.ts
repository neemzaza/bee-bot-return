import { Client, Intents,MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { clientId, birthday, guildId } from "./botconfig.json"
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
// import * as leaveEvent from "./command/leaveEvent"
import "./about"
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
const wait = require('util').promisify(setTimeout);
const token = process.env.TOKEN

// Update bot use => "a!updateEventGuildIdEachGuildByMsg!a"

const commands = [
    // About user and server
    new SlashCommandBuilder()
        .setName("about")
        .setDescription("use /about to see a full description")
        .addSubcommand(subcmd =>
            subcmd
                .setName("yourself")
                .setDescription("About your discord account")
                .addUserOption(option => option.setName('target').setDescription("This user"))
        )
        .addSubcommand(subcmd =>
            subcmd
                .setName("server")
                .setDescription("About this guild")
        ),
    new SlashCommandBuilder()
        .setName("yt")
        .setDescription("View airwavy's youtube channel"),

    new SlashCommandBuilder()
        .setName("birthday")
        .setDescription("Happy birthday!!!"),

]
const rest:REST = new REST({ version: '9' }).setToken(token);

const whoBirthday:string = "Thun";
const date = new Date();

(async () => {
    const intents:any[] = ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
    const client = new Client({ intents: intents });
    
    client.on("guildMemberRemove", member => {
        const avatar:any = member.user?.avatarURL()
        const channel:any = client.channels.cache.get("886952139933483009")
        if (!channel) return
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`${member.displayName} has left the server`)
        .setThumbnail(avatar)

        channel.send({ embeds: [embed] })
        
    })

    client.on('ready', async (interaction) => {

        let allGuildId:string[] = client.guilds.cache.map(guild => guild.id)
        console.log(allGuildId)
        
    })

    client.on("messageCreate", async msg => {
        const guildId:any = msg.guild?.id
        if (msg.content === "a!updateEventGuildIdEachGuildByMsg!a") {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), //'844398657071480872'
                    { body: commands }
                )
                console.log(`Logged into ${msg.guild?.name} as ${client.user?.tag}`);
            } catch (err) {
                console.log("Found error! " + err);
            }
        }
    })

    client.user?.setPresence({ activities: [{name: "Airwavy"}], status: 'idle' })

    client.on('interactionCreate', async interaction => {
        
        
        
        const embed = new MessageEmbed()
            .setColor('#fff')
            .setTitle(`Happy birthday! ${whoBirthday} 14/9/2021!`)
            .setDescription(`สุขสันต์วันเกิด ${whoBirthday} ขอให้เป็นวันที่ดี มีความสุข แข็ง และอย่าเอา Tom & Jerry ตรูไปทำแบบนนั้นอีก -_-`)
            .setImage("https://cdn.discordapp.com/attachments/841924507261468704/886842358866534491/happybirththun2021.jpg")
            .setTimestamp(new Date().setFullYear(new Date().getFullYear(), birthday.month - 1, birthday.date))
            .addFields(
                {name: "ชื่อ", value: whoBirthday},
                {name: "บุคลิก", value: "หน้าตูด"}
            )
            
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('primary')
            .setLabel('Subscribe')
            .setStyle('PRIMARY')
        )
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'yt') {
            interaction.reply({ content: 'Subscribe Please', components: [row] })
        }

        if (interaction.commandName === 'birthday') {
            if (date.getDate() === 13) {
                interaction.reply({ embeds: [embed]})
            } else {
                interaction.reply("AH!!")
            }
        }

        if (interaction.commandName === 'about') {
            
            if (interaction.options.getSubcommand() === "yourself") {
                const user = interaction.options.getUser('target');

                if (user) {
                    await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
                } else {
                    await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
                }
            } else if (interaction.options.getSubcommand() === "server") {
                await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`)
            } else if (!interaction.options.getSubcommand()) {
                await interaction.reply("usage: /about <command>\n\tyourself, server")
            }
        }
    })
    

    client.login(token)
})();