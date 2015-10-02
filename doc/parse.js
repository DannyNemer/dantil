var docdown = require('docdown')
var fs = require('fs')
var package = require('../package.json')

// Generate 'README.md' from JSDoc.
fs.writeFileSync('../README.md', docdown({
	path: '../' + package.main,
	// Remove leading 'git+' and trailing '.git' from repository url.
	url: package.repository.url.slice(4, -4) + '/blob/master/' + package.main,
	toc: 'categories',
	sort: false,
	title: package.name,
	description: [
		package.description,
		'',
		'In addition to [much](#dantil-illFormedOpts) [original](#dantil-redirectOutputToFile) [functionality](#dantil-getModuleCallerPathAndLineNumber), includes [many](#dantil-log) [improved](#dantil-time) [alternatives](#dantil-tryCatchWrapper) [to](#dantil-assertEqual) native functions.',
		'#### Installation',
		'```shell',
		'npm install dannynemer/dantil',
		'```',
		'#### Usage',
		'```javascript',
		'var dantil = require(\'dantil\')',
		'```',
	].join('\n')
}))