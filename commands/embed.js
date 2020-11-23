module.exports = {
	name: 'randomanime',
	description: 'anime!',
	execute(message, args) {
		const Discord = require('discord.js');
        const request = require('request');
        const cheerio = require('cheerio'); 
        var options = {
            url: 'https://yummyanime.club/random',
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Chrome'
            }
        };
 
		request(options, function(error, response, responseBody) {
			if (error) {
				return;
			}
			
			
			let $ = cheerio.load(responseBody);

			let title = $('div.content-block.container.clearfix > div.content > div > div > h1');
			let descriptionofanime = $('#content-desc-text');
			
			let rating = $('span.main-rating');
			let ratingvotes = $('span.main-rating-info')
			let image = $('div.poster-block img')
			let imageurl = 'https://yummyanime.club' + image.attr('src')
			let names = $('body > div.content-block.container.clearfix > div.content > div > div > ul.alt-names-list')
			let views =$('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(1)')
			let status = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(2)')
			let year = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(3)')
			let season = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(4)')
			let restrictions = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(5)')
			let genre = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(6)')
			let sourceone = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(7)')
			let studio = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(8)')
			let director = $('body > div.content-block.container.clearfix > div.content > div > div > ul.content-main-info > li:nth-child(9)')
			const animeEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(title.text())
				.setURL('https://yummyanime.club')
				.setAuthor('YummyAnime', 'https://yummyanime.club/img/ya.png', 'https://yummyanime.club')
				.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: '--------------------', value: names.text() },
					{ name: '--------------------', value: status.text() },
					{ name: '--------------------', value: genre.text() },
					{ name: '--------------------', value: sourceone.text() },
					{ name: '--------------------', value: studio.text() },
					{ name: '--------------------', value: director.text() },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Рейтинг:' + rating.text(), value: ratingvotes.text(), inline: true },
					{ name: views.text(), value: year.text(), inline: true },
					)
				.setDescription(descriptionofanime.text())
				.addField(season.text(), restrictions.text(), true)
				.setImage(image.text())	
				.setTimestamp()
				.setFooter('Kaneki Ken', 'https://yummyanime.club/img/ya.png');
			message.channel.send(animeEmbed);

			if (error) {
				return;
			}
		});


	},
};