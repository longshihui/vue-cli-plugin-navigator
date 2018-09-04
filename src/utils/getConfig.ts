export default function (): PageConfig[] {
    const meta: HTMLMetaElement | null = document.querySelector('meta[name="navigator"]');
    return meta ? JSON.parse(decodeURIComponent(meta.content)) : [];
}
