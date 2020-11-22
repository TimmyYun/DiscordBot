module.exports = {
	name: 'play',
	description: 'play',
	execute(message, args) {
		const ytdl = require('ytdl-core');
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

		}
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

		if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
			play(connection, message);
		})

		
		message.channel.send('Playing music...')
		
		
		
		
		
		
		/*const request = require('request');
        const cheerio = require('cheerio'); 
        var options = {
            url: 'https://www.youtube.com/results?search_query=' + args,
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
			
			
			var links = $('a.thumbnail');
			
			var urls = new Array(links.length).fill(0).map((v, i) => links.attr('href'));
		   	
			if (!urls.length) {
				message.channel.send('Videos not found !')

				return;
			}
	 
			// Send result
			message.channel.send(urls.length + 'videos has found !')
			message.channel.send( urls[0]);
		});


		
		const stream = ytdl('<https://www.youtube.com' + urls[0], { filter: 'audioonly' });
		const dispatcher = message.voice.channel.play(stream);
		
		dispatcher.on('finish', () => message.voice.channel.leave());*/
    },
};