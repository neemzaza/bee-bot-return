"use strict";
// import { SlashCommandBuilder } from "@discordjs/builders";
// import { Client, CommandInteraction } from "discord.js";
// module.exports = {
//     ...new SlashCommandBuilder()
//         .setName("about")
//         .setDescription("use /about to see a full description")
//         .addSubcommand(subcmd =>
//             subcmd
//                 .setName("yourself")
//                 .setDescription("About your discord account")
//                 .addUserOption(option => option.setName('target').setDescription("This user").setRequired(true))
//         )
//         .addSubcommand(subcmd =>
//             subcmd
//                 .setName("server")
//                 .setDescription("About this guild")
//         ),
//     /**
//     *
//     * @param {Client} client
//     * @param {CommandInteraction} interaction
//     * @param {String[]} args
//     * 
//     */
//     run: async (client: Client, interaction: CommandInteraction, args: string[]) => {
//         await interaction.reply("usage: /about <command>\n\tyourself, server")
//         if (interaction.options.getSubcommand() === "yourself") {
//             const user = interaction.options.getUser('target');
//             if (user) {
//                 await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
//             } else {
//                 await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
//             }
//         } else if (interaction.options.getSubcommand() === "server") {
//             await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`)
//         }
//     },
// }
