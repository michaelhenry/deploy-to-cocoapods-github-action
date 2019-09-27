const shell = require('shelljs');
shell.exec("gem install cocoapods")
shell.exec("pod lib lint --allow-warnings")
shell.exec("pod trunk push --allow-warnings")
