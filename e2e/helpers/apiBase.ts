import nextEnv from '@next/env'

nextEnv.loadEnvConfig(process.cwd())

const apiVersion = process.env.NEXT_PUBLIC_SERVER_API_VERSION || 'v1'

export const API_BASE = `**/api/${apiVersion}`
