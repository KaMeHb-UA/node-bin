import { arch, os } from './platform-definition'

type Platform = typeof os
type Arch = typeof arch

declare const PackageDefinition: {
    [release: number]: {
        [major: number]: {
            [minor: number]: {
                [os in Platform]: {
                    [arch in Arch]: {
                        format: '7z' | 'tar.xz' | 'tar.gz' | 'zip'
                        repo: string
                    }
                }
            }
        }
    }
}

export = PackageDefinition
