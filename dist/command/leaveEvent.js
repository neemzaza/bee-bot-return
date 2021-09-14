"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/**
*
* @param {Client} client
*
*/
module.exports = (client) => {
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
        channel.send(embed);
    });
};
