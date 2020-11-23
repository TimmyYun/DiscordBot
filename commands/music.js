module.exports = {
	name: 'play',
	description: 'play',
	execute(message, args) {
		const request = require('request');
		const cheerio = require('cheerio'); 
		const Discord = require('discord.js');
		const ytdl = require('ytdl-core');
		/*function playurl(connection, message){
			var server = servers[message.guild.id];
			server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}))

			server.queue.shift();

			server.dispatcher.on('end', function(){
				if(server.queue[0]){
					play(connection,message);
				}else{
					connection.disconnect();
				}
			})

		}
		function play(connection, message){
			var server = servers[message.guild.id];
			server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}))

			server.queue.shift();

			server.dispatcher.on('end', function(){
				if(server.queue[0]){
					play(connection,message);
				}else{
					connection.disconnect();
				}
			})

		}*/

		if (!message.member.voice.channel) {
			message.channel.send('You need to be in voice channel');
			return;
		}	
		if(!args[0]){
			message.channel.send('You need to provide a link or name of the song');
			return;
		}

		var servers = {};
		if(!servers[message.guild.id]) servers[message.guild.id] = {
			queue: []
		}

		var server = servers[message.guild.id];

		server.queue.push(args[0]);
		if(args.indexOf('youtube.com') != -1){
			if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
				play(connection, message);
			})
		}else{

			var options = {
				url: 'https://www.youtube.com/results?search_query=tokyo+ghoul',
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
		 
		 
				$ = cheerio.load(responseBody);
				
				
				var videourl = $('#thumbnail:first-of-type');
				
				if (error || !videourl.attr('href')) {
					message.reply('AHAHAHAHAHAHAHAHAHAH STOOOOOOOOPID!!!!!!!!!! THERE IS NO LINK');
					return;
				}

				// Send result
				message.channel.send(videourl.attr('href'))
				/*const stream = ytdl('<https://www.youtube.com' + link.attr('href'), { filter: 'audioonly' });
				const dispatcher = message.voice.channel.play(stream);
				
				dispatcher.on('finish', () => message.voice.channel.leave());*/
			});
		}
		
		

		
		
		
		
		
		


		
    },
};