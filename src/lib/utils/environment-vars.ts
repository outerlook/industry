
const safeGetEnv = (envName: string ): string => {
    const env = process.env[envName];
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
    "LINK_GITHUB_PROJECT",
    "LINK_STORYBOOK",
] as const

const {LINK_STORYBOOK, LINK_GITHUB_PROJECT} = getSafeEnvs(envsToGet)

export {LINK_GITHUB_PROJECT, LINK_STORYBOOK}