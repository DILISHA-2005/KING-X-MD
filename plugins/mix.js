const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const yts = require('yt-search');
const domain = `https://manu-ofc-api-site-6bfcbe0e18f6.herokuapp.com`;
const api_key = `Manul-Ofc-Song-Dl-Key-9`;

cmd({
    pattern: "song",
    alias: ["audio"],
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('Please provide a title.');
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*💚🎵 𝐘𝐓 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎵💚*
        
> *\`➤ Title\` :* ${data.title}

> *\`➤ Views\` :* ${data.views}

> *\`➤ DESCRIPTION\`:* ${data.description}

> *\`➤ TIME\`:* ${data.timestamp}

> *\`➤ AGO\`:* ${data.ago}

> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝙺𝙸𝙽𝙶-𝚇-𝙼𝙳*`;

//==========Send Thumbnail With Details==========
await conn.sendMessage(m.chat, {
            image: { url: data.thumbnail },
            caption: `${desc}`
        }, { quoted: mek });
        
    const response = await fetchJson(`${domain}/api/ytmp3?videoUrl=${data.url}&apikey=${api_key}`);
    
    const downloadUrl = response.data.dl_link;
//============Send Audio======================
await conn.sendMessage(from,{audio:{url: downloadUrl },mimetype:"audio/mpeg",caption :"> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝙳𝙸𝙻𝙸𝚂𝙷𝙰☯*"},{quoted:mek})
//=============Send Document=================
await conn.sendMessage(from,{document:{url: downloadUrl },mimetype:"audio/mpeg",fileName: data.title + ".mp3" ,caption :"> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝙳𝙸𝙻𝙸𝚂𝙷𝙰☯*"},{quoted:mek})

} catch (e) {
console.log(e)
reply(`${e}`)
}
})
