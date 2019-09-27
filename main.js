const shell = require('shelljs');
shell.exec("pod lib lint --allow-warning")
shell.exec("pod trunk push --allow-warnings")
