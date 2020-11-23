module.exports = {
	name: 'embed',
	description: 'Timmy!',
	execute(message, args) {
        const file = new Discord.MessageAttachment('../assets/discordjs.png');

        const exampleEmbed = {
            title: 'Some title',
            image: {
                url: 'attachment://discordjs.png',
            },
        };

        channel.send({ files: [file], embed: exampleEmbed });
            },
};