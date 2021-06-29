const {
  MessageEmbed,
} = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");

module.exports.nFormatter = nFormatter;
module.exports.change_status = change_status;
module.exports.shuffle = shuffle;
module.exports.formatDate = formatDate;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.duration = duration;
module.exports.getRandomNum = getRandomNum;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.swap_pages = swap_pages;
module.exports.escapeRegex = escapeRegex;
module.exports.arrayMove = arrayMove;
module.exports.isValidURL = isValidURL;
module.exports.GetUser = GetUser;
module.exports.GetRole = GetRole;
module.exports.GetGlobalUser = GetGlobalUser;
module.exports.parseMilliseconds = parseMilliseconds;

function parseMilliseconds(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}

	return {
		days: Math.trunc(milliseconds / 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60,
		milliseconds: Math.trunc(milliseconds) % 1000,
		microseconds: Math.trunc(milliseconds * 1000) % 1000,
		nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
	};
}

function isValidURL(string) {
  const args = string.split(" ");
  let url;
  for(const arg of args){
    try {
      url = new URL(arg);
      url = url.protocol === "http:" || url.protocol === "https:";
      break;
    } catch (_) {
      url = false;
    }
  }
  return url;
};

function GetUser(message, arg){
  var errormessage = ":x: I failed finding that User...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.users.first();
    if(!user && args[0] && args[0].length == 18) {
      user = await client.users.fetch(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = message.guild.members.cache.map(member=> String(member.user.tag).toLowerCase())
      user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
      user = message.guild.members.cache.find(me => String(me.user.tag).toLowerCase() == user)
      if(!user || user == null || !user.id) {
        alluser = message.guild.members.cache.map(member => String(member.displayName + "#" + member.user.discriminator).toLowerCase())
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = message.guild.members.cache.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
        if(!user || user == null || !user.id) return reject(errormessage)
      }
      user = await client.users.fetch(user.user.id)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.users.first() || message.author;
      return resolve(user);
    }
  })
}

function GetRole(message, arg){
  var errormessage = ":x: I failed finding that Role...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.rolee.filter(role=>role.guild.id==message.guild.id).first();
    if(!user && args[0] && args[0].length == 18) {
      user = message.guild.rolee.cache.get(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = message.guild.rolee.cache.map(role => String(role.name).toLowerCase())
      user = alluser.find(r => r.split(" ").join("").includes(args.join("").toLowerCase()))
      user = message.guild.rolee.cache.find(role => String(role.name).toLowerCase() === user)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.rolee.filter(role=>role.guild.id==message.guild.id).first();
      if(!user) return reject(errormessage)
      return resolve(user);
    }
  })
}

function GetGlobalUser(message, arg){
  var errormessage = ":x: I failed finding that User...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.users.first();
    if(!user && args[0] && args[0].length == 18) {
      user = await client.users.fetch(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = [], allmembers = [];
      var guilds = client.guilds.cache.array()
      for(const g of guilds){
        var members = g.members.cache.array();
        for(const m of members) { alluser.push(m.user.tag); allmembers.push(m); }
      }
      user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
      user = allmembers.find(me => String(me.user.tag).toLowerCase() == user)
      if(!user || user == null || !user.id) {
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = allmembers.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
        if(!user || user == null || !user.id) return reject(errormessage)
      }
      user = await client.users.fetch(user.user.id)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.users.first() || message.author;
      return resolve(user);
    }
  })
}


function shuffle(a) {
  try {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("en-US").format(date);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function parseDuration(duration) {
  let remain = duration
  let days = Math.floor(remain / (1000 * 60 * 60 * 24))
  remain = remain % (1000 * 60 * 60 * 24)

  let hours = Math.floor(remain / (1000 * 60 * 60))
  remain = remain % (1000 * 60 * 60)

  let minutes = Math.floor(remain / (1000 * 60))
  remain = remain % (1000 * 60)

  let seconds = Math.floor(remain / (1000))
  remain = remain % (1000)

  let milliseconds = remain

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}

function formatTime(o, useMilli = false) {
  let parts = []
  if (o.days) {
    let ret = o.days + ' Day'
    if (o.days !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (o.hours) {
    let ret = o.hours + ' Hr'
    if (o.hours !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (o.minutes) {
    let ret = o.minutes + ' Min'
    if (o.minutes !== 1) {
      ret += 's'
    }
    parts.push(ret)

  }
  if (o.seconds) {
    let ret = o.seconds + ' Sec'
    if (o.seconds !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (useMilli && o.milliseconds) {
    let ret = o.milliseconds + ' ms'
    parts.push(ret)
  }
  if (parts.length === 0) {
    return 'instantly'
  } else {
    return parts
  }
}


function duration(duration, useMilli = false) {
  let time = parseDuration(duration)
  return formatTime(time, useMilli)
}


function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function getRandomInt(max) {
  try {
    return Math.floor(Math.random() * Math.floor(max));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function getRandomNum(min, max) {
  try {
    return Math.floor(Math.random() * Math.floor((max - min) + min));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function createBar(total, current, size = 25, line = "▬", slider = "🔷") {
  try {
    if (!total) throw "MISSING MAX TIME";
    if (!current) return `**[${mover}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    let bar = current > total 
        ? [line.repeat(size / 2 * 2), (current / total) * 100] 
        : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) 
          + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
    if (!String(bar).includes(mover)) {
      return `**[${mover}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    } else{
      return `**[${bar[0]}]**\n**${new Date(current).toISOString().substr(11, 8) + " / " + (current == 0 ? " ◉ LIVE" : new Date(total).toISOString().substr(11, 8))}**`;
    }
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function arrayMove(array, from, to) {
  try {
    array = [...array];
    const startIndex = from < 0 ? array.length + from : from;
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = to < 0 ? array.length + to : to;
      const [item] = array.splice(from, 1);
      array.splice(endIndex, 0, item);
    }
    return array;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function nFormatter(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

async function swap_pages(client, message, description, TITLE) {
  let currentPage = 0;
  //GET ALL EMBEDS
  let embeds = [];
  //if input is an array
  if (Array.isArray(description)) {
    try {
      let k = 15;
      for (let i = 0; i < description.length; i += 15) {
        const current = description.slice(i, k);
        k += 15;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        embeds.push(embed);
      }
      embeds;
    } catch {}
  } else {
    try {
      let k = 1000;
      for (let i = 0; i < description.length; i += 1000) {
        const current = description.slice(i, k);
        k += 1000;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        embeds.push(embed);
      }
      embeds;
    } catch {}
  }
  if (embeds.length === 1) return message.channel.send(embeds[0]).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  const queueEmbed = await message.channel.send(
    `**Current Page - ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  ).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let reactionemojis = ["⬅️", "⏹", "➡️"];
  try {
    for (const emoji of reactionemojis)
      await queueEmbed.react(emoji);
  } catch {}

  const filter = (reaction, user) =>
    (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, {
    time: 45000
  });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = 0
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = embeds.length - 1
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else {
        collector.stop();
        reaction.message.reactions.removeAll();
      }
      await reaction.users.remove(message.author.id);
    } catch {}
  });

}

function change_status(client) {
  try {
    client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size} Guilds | ${Math.ceil(client.users.cache.size/1000)}k Members`, {
      type: "PLAYING",
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

