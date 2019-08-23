declare const PlatformDefinition : {
    arch: 'armv6l'
        | 'armv7l'
        | 'arm64'
        | 'mips'
        | 'mipsel'
        | 'ppc'
        | 'ppc64'
        | 'ppc64le'
        | 's390'
        | 's390x'
        | 'x86'
        | 'x64'

    os:   'aix'
        | 'android'
        | 'darwin'
        | 'freebsd'
        | 'linux'
        | 'openbsd'
        | 'sunos'
        | 'win'
}

export = PlatformDefinition
