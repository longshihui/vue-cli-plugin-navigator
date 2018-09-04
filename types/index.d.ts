declare module global {
    export interface PageConfig {
        title: string,
        path: string,
        type?: string,
        badgeColor?: string,
        description?: string
    }
}
