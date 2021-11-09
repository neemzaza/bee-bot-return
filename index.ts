require('dotenv').config();
import { Client, Intents, Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js";
import { clientId, birthday, guildId } from "./botconfig.json"
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DisTube, Queue } from "distube";
// import * as leaveEvent from "./command/leaveEvent"
import "./about"
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
// const token:any = process.env.TOKEN

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

    new SlashCommandBuilder()
        .setName("help")
        .setDescription("use /help to view all commands available")


]


// @ts-ignore
const rest: REST = new REST({ version: '9' }).setToken(process.env.TOKEN);

const whoBirthday: string = "Thun";
const date = new Date();

(async () => {
    const intents: any[] = ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_INTEGRATIONS"]
    const client = new Client({ intents: intents });
    client.user?.setPresence({ activities: [{ name: 'together' }], status: 'invisible' })




    const distube = new DisTube(client, 
        { searchSongs: 0, searchCooldown: 30,leaveOnEmpty: true, emptyCooldown: 0,leaveOnFinish: true, leaveOnStop: true })





    client.on("guildMemberRemove", member => {
        const avatar: any = member.user?.avatarURL()
        const channel: any = client.channels.cache.get("886952139933483009")
        if (!channel) return
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`${member.displayName} has left the server`)
            .setThumbnail(avatar)

        channel.send({ embeds: [embed] })

    })





    client.on('ready', async (interaction) => {
        distube.setMaxListeners(0)
        let allGuildId: string[] = client.guilds.cache.map(guild => guild.id)
        console.log(allGuildId)

    })


    // Detect @everyone and @here
    client.on('messageCreate', (msg: any) => {
        let role = msg.guild.roles.cache.find((r:any) => r.id === "905997597234307162")
        let person = msg.member;
        let message = msg.content.toLowerCase()
        let word = ["@everyone", "@here"]

        const staffRoom:any = client.channels.cache.get("873030186952691794")

        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`รายงานครับท่าน - พบการใช้ tag "Everyone หรือ Here"`)
            .setDescription(`สมาชิกชื่อ : ${person.user.username}#${person.user.discriminator}\nเขานั้นได้ทำการ tag "Everyone" หรือ "Here" ตอนนี้ผมได้ทำการลบข้อความนั้นและตักเตือนเขาไปแล้ว`)
            .setAuthor(`REPORT - BEE BOT RETURN`)
            .setTimestamp(new Date())

        if (msg.member.roles.cache.some((role:any) => role.id === "873035682992513085")) return;
        

        for (let i = 0; i < word.length; i++) {
            if (message.includes(word[i])) {
                if (msg.guild?.id === "873030042412797972" || msg.guild?.id === "841924507261468702") {
                    msg.delete()
                    msg.author.send("พบการแท็ก Everyone หรือ Here นะครับ ตรวจสอบให้แน่ใจว่าได้ไปกดลิงค์อะไรแปลกๆ ป่าว ถ้าคุณไม่ได้จงใจ แสดงว่าคุณนั้น **โดนแฮ็กแล้วครับ**")
                    staffRoom.send({ embeds: [embed]})
                    // console.log(person)
                }
            }
        }
    })
    
    client.on('messageCreate', (msg: any) => {
        let message = msg.content.toLowerCase();
        let word = ["unable to connect to world", "online-mode", "paper กับ spigot", "spigot กับ paper", "เซิฟหน่วง", "ขึ้นข้อความแดงบนหน้า console"]

        // for (let i = 0; i < word.length; i++) {
        if (msg.guild?.id === "873030042412797972" || msg.guild?.id === "841924507261468702") {
            if (message.includes(word[0])) {
                msg.reply("ลองดูคลิปนี้ https://youtu.be/KBnUjWcz9Ds")
            } else if (message.includes(word[1])) {
                msg.reply("ใน server.properties ตรง online-mode ถ้าอยากให้มายคราฟไอดีแท้เข้าอย่างเดียวให้ปรับเป็น true ครับ ส่วนถ้าอยากให้ทั้งแท้และไม่แท้เข้าให้ปรับเป็น false ครับ")
            } else if (message.includes(word[2]) || message.includes(word[3])) {
                msg.reply("paper จะดัดแปลงจาก spigot อีกทีครับ ซึ่งมันจะแก้ไขบัคบางอย่างที่มีใน minecraft ด้วย")
            } else if (message.includes(word[4])) {
                msg.reply("ลองเพิ่มแรมที่ตัว run.bat ดูครับ โดยไปแก้ไขตรง -Xms1024M ถ้าแรมเครื่องคุณ 8GB แนะนำให้เพิ่มต่อหลัง -Xm...24M เป็น -Xmx5G ครับ หรือถ้าแรมมากกว่า 8GB ก็ให้ปรับตามความเหมาะสมครับ")
            } else if (message.includes(word[5])) {
                msg.reply("ไม่ต้องตกใจครับ มันเกิดจากการที่เซิฟไม่ตอบสนองหรือเซิฟค้างชั่วขณะเท่านั้นครับ ลองไปเพิ่มแรมอาจจะหายดีครับ")
            }
        }
        // }
    })
    
    client.on("messageCreate", async (msg: any) => {
        const guildId: any = msg.guild?.id
        const prefix = '$'
        const args = msg.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift()

        

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
        if (msg.author.bot) return
        if (!msg.content.startsWith(prefix)) return

        if (command === "play") {
            if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if (!args[0]) return msg.channel.send("เว้นวรรคแล้วใส่ชื่อเพลงด้วย!");

            distube.play(msg, args.join(" "))
        }
        if (command === "stop") {

            const bot = msg.guild?.members.cache.get(client.user?.id!)
            if (!msg.member?.voice.channel) return msg.channel.send("คุณไม่ได้อยู่ในห้องเสียงไหนเลยนะ?");
            if (bot?.voice.channel !== msg.member?.voice.channel) return msg.channel.send('คุณไม่ได้อยู่ที่เดียวกับบอทนะ')
            distube.stop(msg)
            msg.channel.send('คุณได้หยุดเพลงเรียบร้อย!')
        }
        if (command === "queue") {
            const queue: any = distube.getQueue(msg)

            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
            }
            msg.channel.send('คิวตอนนี้:\n' + queue.songs.map((song: { name: string; url: string; formattedDuration: any; }, id: number) =>
                `**${id + 1}**. [${song.name}](${song.url}) ความยาว \`${song.formattedDuration}\``
            ).join("\n"));

        }

        if (command === "loop") {
            const mode = distube.setRepeatMode(msg)
            const queue: any = distube.getQueue(msg)

            if (!queue) return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ")
            msg.channel.send(`เปิดโหมดการ วนเพลงเป็น \`${mode ? mode === 2 ? 'ทุกคิว' : 'วนแค่เพลงนี้' : 'ปิดอยู่'}\``)
        }

        if (command === "skip") {
            const queue: any = distube.getQueue(msg)

            if (!queue) {
                return msg.channel.send("ในคิวไม่มีเพลงอยู่เลยนะ จะข้ามไปไหน?")
            }
            distube.skip(msg)
        }

        if (command === "volume") {
            if (!args[0]) return msg.reply("กลับไปใส่ระดับเสียงซะ...")
            distube.setVolume(msg, parseInt(args[0]))
            msg.channel.send(`ปรับระดับเสียงเพลงให้้เป็น ${args[0]} แล้วครับ`)
        }
    })

    const status = (queue: Queue) => 
            `ความดัง: \`${queue.volume}%\` | ออโต้จูนเสียง: \`${queue.filters.join(', ')
            || 'ปิดอยู่'}\` | วนไหม?: \`${queue.repeatMode
                ? queue.repeatMode === 2
                    ? 'All Queue'
                    : 'This Song'
                : 'ปิดอยู่'
            }\` | เล่นเองไหม?: \`${queue.autoplay ? 'On' : 'Off'}\``

        // DisTube event listeners, more in the documentation page
        distube

            .on('playSong', (queue: any, song) =>
                queue.textChannel.send(
                    `กำลังเปิดเพลง \`${song.name}\` ความยาวเพลง \`${song.formattedDuration
                    }\`\nโดนสั่งโดย by: ${song.user}\n${status(queue)}`,
                ))

            .on('addSong', (queue: any, song) =>
                queue.textChannel.send(
                    `เพิ่มเพลง ${song.name} - \`${song.formattedDuration}\` ไปยังรายการเปิดเพลง โดย ${song.user}`,
                ))
                
            .on('addList', (queue: any, playlist) =>
                queue.textChannel.send(
                    `เพิ่มรายการเพลง \`${playlist.name}\` จำนวน (${playlist.songs.length
                    } songs) ไปยังรายการเปิดเพลง\n${status(queue)}`,
                ))
            // DisTubeOptions.searchSongs = true
            .on('searchResult', (message, result) => {
                let i = 0
                message.channel.send(
                    `**Choose an option from below**\n${result
                        .map(
                            song =>
                                `**${++i}**. ${song.name} - \`${song.formattedDuration
                                }\``,
                        )
                        .join(
                            '\n',
                        )}\n*Enter anything else or wait 30 seconds to cancel*`,
                )
            })
            .on('searchCancel', (message: any) => message.channel.send(`การค้นหา ถูกหยุด`))
            .on('searchInvalidAnswer', (message: any) =>
                message.channel.send(`searchInvalidAnswer`))
            .on('searchNoResult', (message: any) => message.channel.send(`ไม่เจออ่ะ`))
            .on('error', (textChannel, e: any) => {
                console.error(e)
                textChannel.send(`An error encountered: ${e.slice(0, 2000)}`)
            })
            
            .on('finish', (queue: any) => queue.textChannel.send('หมดคิวละไปนอนต่อละ'))
            .on('finishSong', (queue: any) => queue.textChannel.send('เพลงจบไปแล้ว 1'))
            .on('disconnect', (queue: any) => queue.textChannel.send('ไปละ'))
            .on('empty', (queue: any) => queue.textChannel.send('Empty!'))





    

    client.on('interactionCreate', async interaction => {

        const channel = client.channels.cache.get("887156603302871110")

        const embed = new MessageEmbed()
            .setColor('#fff')
            .setTitle(`Happy birthday! ${whoBirthday} 14/9/2021!`)
            .setDescription(`สุขสันต์วันเกิด ${whoBirthday} ขอให้เป็นวันที่ดี มีความสุข แข็ง และอย่าเอา Tom & Jerry ตรูไปทำแบบนนั้นอีก -_-`)
            .setImage("https://cdn.discordapp.com/attachments/841924507261468704/886842358866534491/happybirththun2021.jpg")
            .setTimestamp(new Date().setFullYear(new Date().getFullYear(), birthday.month - 1, birthday.date))
            .addFields(
                { name: "ชื่อ", value: whoBirthday },
                { name: "บุคลิก", value: "หน้าตูด" }
            )

        const embedhelp = new MessageEmbed()
            .setColor('#fff')
            .setTitle(`Help Center - All commands`)
            .addFields(
                { name: "Music bot", 
                value: "$play เว้นวรรคตามด้วยชื่อเพลงเพื่อเล่น\n$skip เพื่อข้าม\n$stop เพื่อหยุดเพลง\n $queue เพื่อดูลำดับการเปิดเพลง\n$volume เว้นวรรคตามด้วยระดับเสียงเพืื่อปรับระดับเสียงเพลง\n$loop เพืื่อวนเพลงมี 3 โหมด วิธีเลือกให้ใช้คำสั่งนี้ซ้ำมันจะบอกโหมดที่เราใช้อยู่" }
            )

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Subscribe')
                    .setStyle('PRIMARY')
            )

        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'help') {
            return interaction.reply({embeds: [embedhelp], ephemeral: true})
        }

        // WIP
        if (interaction.channel !== channel) {
            interaction.reply({ content: "You not have permission to access this channel (รอหน่อยเดี๋ยวเปิดให้ใช้กันแล้ว)", ephemeral: true });
            return
        }

        if (interaction.commandName === 'yt') {
            interaction.reply({ content: 'Subscribe Please', components: [row] })
        }

        // if (interaction.commandName === 'birthday') {
        //     if (date.getDate() === 14) {
        //         interaction.reply({ embeds: [embed] })
        //     } else {
        //         interaction.reply("AH!!")
        //     }
        // }

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





    client.login(process.env.TOKEN)
})();