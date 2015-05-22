var prompt = require('prompt');

var schema =[{
	name: 'username',
	default: 'bill',
	required: true
	}, {
	name: 'password',
	default: 'bobb',
	hidden: true,
	conform: function (value) {
		return true;
	}
	}, {
		name: 'rootFolder',
		default: __dirname,
		required: true
	}
];

prompt.start();
prompt.get(schema, function (err, result) {
	if (err) {
		console.log('error: ',err);
	} else {
		console.log('Command-line input received:');
		console.log('  username: ' + result.username);
		console.log('  password: ' + result.password);
		console.log('  rootFolder: ' + result.rootFolder);
	}
});

