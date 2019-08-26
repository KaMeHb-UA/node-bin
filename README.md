# Node.js precompiled binaries index

## What is this

The largest index of precompiled nodejs binaries to which everyone free to contribute!  
How to do this? Just look to the [version tree](./pkgs.json6) and check which version is not in the index or precompiled not for all platforms. You may also look for packages in deprecated formats. Found? Ok, lets get started*!  
\* From step 4 you free to choose your favorite distribution service instead of GitHub releases but an example provided only for this service

1. Compile node. [How to](https://github.com/nodejs/node/blob/master/BUILDING.md)

1. Package compiled files like it [already done](https://github.com/KaMeHb-UA/node-bin/releases/download/v12.4.0/node-v12.4.0-android-arm64.tar.xz) (with included man files and LICENSE file). The best choice - tar.xz archive. It may be used on any platform and has small packaged size with optimal decompression time. For the future, our main mission will be repackaging old Mac OS's pkg files and Windows exe, msi, zip and 7z files to get this packages be extracted on any platform

1. Name your archive like `node-v{RELEASE}.{MAJOR}.{MINOR}-{PLATFORM}-{ARCHITECTURE}.{FORMAT}`. You will get something like `node-v12.4.0-android-arm64.tar.xz`.

1. Create an empty repository and publish some HEAD. Also you can use an existing repository

1. Create new release on "Releases" page. Use "v-prefixed" versioning. Version must be the same you already compiled. For example if you compiled version `12.4.0`, your release version must be `v12.4.0`

1. Add your archive to the assets. There may be few archives with precompiled binaries if version match

1. Fork this repository. Change the [main index file](./pkgs.json6) by adding your repository to the '@repos' section like [was already done](https://github.com/KaMeHb-UA/node-bin/blob/12b8376bec9ff49f57778f8969ab39a55d5087b0/pkgs.json6#L7). Name it `github/MYNICKNAME` where `MYNICKNAME` is your nickname on GitHub. You may use inheritance or describe your repo independently

1. Add your precompiled version to relevant section of index file.  
For example, if your version is `12.4.0`, platform is `android` and architecture is `arm64`, you must enter to the section `12:{ 4:{ 0: { android: {} } } }`. Then you must add field `arm64` with value `github/MYNICKNAME` where `MYNICKNAME` is your nickname on GitHub

1. Make new PR with your changes and wait for apply.

## How to use it

The main purpose is to load binary node distribution as a package dependency. There is a meta-package to deal with. You may install it using your favorite package manager:

```sh
yarn add @marlock/node
```

```sh
npm i @marlock/node
```

Package supports semantic versioning. This means package will adapt to your environment. Package will choose the most relevant binary node distribution available for your platform during installation process

## Licenses and thanks

All distributed products are licensed after its respective licenses that is included in each archive.
