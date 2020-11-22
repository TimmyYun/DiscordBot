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

			let title = $('head title');
			let descriptionofanime = $('div.content-desc-text p');
			let rating = $('span.main-rating');
			let ratingvotes = $('span.main-rating-info')
			let image = $('div.poster-block img')
			let views =$('ul.content-main-info li:nth-child(1)')
			
			const animeEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(title.text().slice(6,title.length-17))
				.setURL('https://discord.js.org/')
				.setAuthor('YummyAnime', 'https://yummyanime.club/img/logo_circle1.png', 'https://yummyanime.club')
				.setDescription(descriptionofanime.text())
				.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'Views:', value: views.text() },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Rating:' + rating.text(), value: ratingvotes.text(), inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				//.setImage('https://images-na.ssl-images-amazon.com/images/I/61p2jaL9YOL._AC_SY741_.jpg')	
				.setImage('https://yummyanime.club' + image.attr('src'))	
				.setTimestamp()
				.setFooter('Kaneki Bot', 'https://yummyanime.club/img/logo_circle1.png');
			message.channel.send(animeEmbed);

			
		});


	},
};