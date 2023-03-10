
const safeGetEnv = (envName: string ): string => {
    const env = import.meta?.env[envName];
    if (env === undefined) {
        throw new Error(`Environment variable ${envName} is not defined`)
    }
    return env
}
const getSafeEnvs = <T extends string>(envNames: readonly T[]): Record<T, string> => {
    const envs: Record<T, string> = {} as Record<T, string>;
    envNames.forEach(envName => {
        envs[envName] = safeGetEnv(envName)
    })
    return envs
}

const envsToGet = [
    "PUBLIC_LINK_GITHUB_PROJECT",
    "PUBLIC_LINK_STORYBOOK",
] as const

const {PUBLIC_LINK_STORYBOOK, PUBLIC_LINK_GITHUB_PROJECT} = getSafeEnvs(envsToGet)

export {PUBLIC_LINK_GITHUB_PROJECT, PUBLIC_LINK_STORYBOOK}