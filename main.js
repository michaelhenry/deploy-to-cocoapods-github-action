const shell = require('shelljs');
shell.exec("set - eo pipefail")
shell.exec("gem install cocoapods")
shell.env["LIB_VERSION"] = shell.exec("echo $(git describe --tags `git rev-list --tags --max-count=1`)")
shell.exec("pod lib lint --allow-warnings")
shell.exec("pod trunk push --allow-warnings")
