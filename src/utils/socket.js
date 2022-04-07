const socket = require('socket.io');
const axios = require('axios')

let socketServer = {};
// socketServer.io = {};
socketServer.updateTime = new Date().getTime() - 100000;
// socketServer.updateTime = new Date().getTime();
// socketServer.updateTime = 0;

socketServer.init = (server) => {
	socketServer.io = socket(server);
	socketServer.io.on('connection', (socket) => {

	});
}
socketServer.update = async () => {
	//console.log('update')
	// let postsAPI = await axios.get(api_url+`/new/0`);
	let postsAPI = await axios.get(api_url+`/trending?after=${socketServer.updateTime}`);
	//console.log(postsAPI.data.length)
	let _update = socketServer.updateTime;
	let _finalData = [];
	if (postsAPI.data.length > 0) {
		await Promise.all(
			postsAPI.data.map(async (post) => {
				if (post.ts > socketServer.updateTime) {
					_update = post.ts> _update?post.ts:_update; 
					let userAPI = await axios.get(api_url+`/account/${post.author}`); 
					_finalData.push({ ...post, user: userAPI.data.json || false });
				}
			})
		)
	}
	//console.log( _finalData.length, _update, socketServer.updateTime);
	if (_finalData.length > 0) {
		socketServer.updateTime = _update + 100;
		socketServer.io.emit('tmac', {data: _finalData});
	}
}

module.exports = socketServer;