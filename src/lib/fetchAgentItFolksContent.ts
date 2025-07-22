// lib/fetchAgentItFolksContent.ts

export async function fetchAgentItFolksContent() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/agent-it-folks-contents?populate=*`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch agent content");

    const { data } = await res.json();
    return data?.[0] ?? null;
}
