type PlatformDefinition = {
    arch: 'armv6l'
        | 'armv7l'
        | 'arm64'
        | 'mips'
        | 'mipsel'
        | 'ppc'
        | 'ppc64le'
        | 's390'
        | 's390x'
        | 'x86'
        | 'x64'

    os:   'freebsd'
        | 'linux'
        | 'openbsd'
        | 'sunos'
} | {
    os:   'js'
    arch: 'wasm'
} | {
    os:   'darwin'
    arch: 'x64'
} | {
    os:   'win'
    arch: 'x64'
        | 'x86'
} | {
    os:   'aix'
    arch: 'ppc64'
} | {
    os:   'android'
    arch: 'x64'
        | 'x86'
        | 'armv6l'
        | 'armv7l'
        | 'arm64'
}

function platformDefinition(platform?: {
    os?: string
    arch?: string
}): PlatformDefinition

export = platformDefinition
