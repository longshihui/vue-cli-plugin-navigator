declare interface PageConfig {
    name: string,
    // 页面标题
    title: string,
    // 页面访问路径
    path: string,
    // 页面的标志的tags
    tags: string[],
    // 页面描述
    description: string
}

declare interface Tag {
    name: string,
    color: string
}

declare interface PluginConfig {
    title: string,
    defineTags: Tag[],
    pages: PageConfig[]
}
