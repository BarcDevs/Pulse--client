import { AxiosError } from 'axios'

export type SilentableError = AxiosError & { silent?: boolean }
