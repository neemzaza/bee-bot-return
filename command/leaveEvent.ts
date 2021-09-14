import { Client,MessageEmbed } from "discord.js";
/**
*
* @param {Client} client
*
*/
module.exports = (client: Client) => {
    client.on("guildMemberRemove", member => {
        const avatar:any = member.user?.avatarURL()
        const channel:any = client.channels.cache.get("886952139933483009")
        if (!channel) return
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`${member.displayName} has left the server`)
        .setThumbnail(avatar)

        channel.send(embed)
        
    })
}
declare module "./leaveEvent" {
    const leaveEvent : Object
}
