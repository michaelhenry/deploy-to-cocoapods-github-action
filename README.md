# Deploy to cocoapods

Using this GitHub Action, you can deploy automatically your pod library to [Cocoapods.org](https://cocoapods.org)

## Requirements

- Must have register to cocoapod trunk. Please refer to [Getting setup with Trunk](https://guides.cocoapods.org/making/getting-setup-with-trunk.html) on how to register.
- Get your `trunk token` by using `pod trunk me --verbose` from your command line.

  Example response:

  ```bash
  opening connection to trunk.cocoapods.org:443...
  opened
  starting SSL for trunk.cocoapods.org:443...
  SSL established, protocol: TLSv1.2, cipher: ECDHE-RSA-AES128-GCM-SHA256
  <- "GET /api/v1/sessions HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json; charset=utf-8\r\nUser-Agent: CocoaPods/1.7.4\r\nAuthorization: Token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\r\nAccept-Encoding: gzip;q=1.0,deflate;q=0.6,identity;q=0.3\r\nHost: trunk.cocoapods.org\r\n\r\n"
  -> "HTTP/1.1 200 OK\r\n"
  -> "Date: Sun, 22 Sep 2019 05:11:46 GMT\r\n"
  -> "Connection: keep-alive\r\n"
  -> "Strict-Transport-Security: max-age=31536000\r\n"
  -> "Content-Type: application/json\r\n"
  -> "Content-Length: 1491\r\n"
  -> "X-Content-Type-Options: nosniff\r\n"
  -> "Server: thin 1.6.2 codename Doc Brown\r\n"
  -> "Via: 1.1 vegur\r\n"
  -> "\r\n"
  ```
  Please get only the `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` as your `trunk token`.

- register the your `trunk token` as [Secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) and named it as `COCOAPODS_TRUNK_TOKEN`.

## Usage

The workflow, usually declared in `.github/workflows/deploy_to_cocoapods.yml`, looks like:

```yml
name: deploy_to_cocoapods

on:
  push:
    tags:
      - '*'

jobs:
  build:

    runs-on: macOS-latest

    steps:
    - uses: actions/checkout@v1
    - name: Install Cocoapods
      run: gem install cocoapods
    - name: Deploy to Cocoapods
      run: |
        set -eo pipefail
        pod lib lint --allow-warning
        pod trunk push --allow-warnings
      env:
        COCOAPODS_TRUNK_TOKEN: ${{ secrets.COCOAPODS_TRUNK_TOKEN }}
```

## Example

An actual example can be found on this Repository: [Autobot](https://github.com/michaelhenry/AutoBot/blob/master/.github/workflows/deploy_to_cocoapods.yml).

## Recommendations

I also do recommend to automatically sync your library versioning with your `git tags or releases`. for example this  `*.spec` file, I provided an environment variable for `LIB_VERSION` to use as the actual version, else it will goes to fallback version which is `1.0`

```ruby
Pod::Spec.new do |s|
  s.name             = 'AutoBot'
  s.version          = ENV['LIB_VERSION'] || '1.0' #fallback to major version
  s.summary          = 'UITestCases generator and executor for iOS Application.'
...
end
```

on the github action, we have to update the step `Deploy to Cocoapods` from

```yml
...
    - name: Deploy to Cocoapods
      run: |
        set -eo pipefail
        pod lib lint --allow-warning
        pod trunk push --allow-warnings
      env:
        COCOAPODS_TRUNK_TOKEN: ${{ secrets.COCOAPODS_TRUNK_TOKEN }}
```

to 

```yml
...
    - name: Deploy to Cocoapods
      run: |
        set -eo pipefail
        export LIB_VERSION=$(git describe --tags `git rev-list --tags --max-count=1`)
        pod lib lint --allow-warning
        pod trunk push --allow-warnings
      env:
        COCOAPODS_TRUNK_TOKEN: ${{ secrets.COCOAPODS_TRUNK_TOKEN }}
```

and that's all.


## Cheers!

If you found some problems or encountered some troubles, please don't hessitate to let me know. I'm happy to help you!

## LICENSE

MIT
