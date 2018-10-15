export default function (): PluginConfig {
    const meta: HTMLMetaElement | null = document.querySelector('meta[name="navigator"]');
    return meta ? JSON.parse(decodeURIComponent(meta.content)) : {};
}
