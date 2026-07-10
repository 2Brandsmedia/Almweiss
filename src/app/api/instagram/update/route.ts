import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const INSTAGRAM_USERNAME = "_almweiss_";
const MAX_POSTS = 9;

// Cron-Secret für Authentifizierung (per Env-Var gesetzt)
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Prüfe Authorization Header für Cron Jobs
  const authHeader = request.headers.get("authorization");

  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Instagram Profil-Seite abrufen
    const response = await fetch(
      `https://www.instagram.com/${INSTAGRAM_USERNAME}/?__a=1&__d=dis`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      // Fallback: Versuche die HTML-Seite zu parsen
      const htmlResponse = await fetch(
        `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );

      const html = await htmlResponse.text();

      // Extrahiere Post-URLs aus dem HTML (Shortcodes)
      const shortcodeRegex = /\/p\/([A-Za-z0-9_-]+)\//g;
      const matches = [...html.matchAll(shortcodeRegex)];
      const uniqueShortcodes = [...new Set(matches.map((m) => m[1]))];

      const posts = uniqueShortcodes
        .slice(0, MAX_POSTS)
        .map((code) => `https://www.instagram.com/p/${code}/`);

      if (posts.length > 0) {
        await updatePostsFile(posts);
        return NextResponse.json({
          success: true,
          message: "Posts updated from HTML",
          count: posts.length,
          posts,
        });
      }

      return NextResponse.json(
        { error: "Could not fetch Instagram posts" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const edges = data?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];

    const posts = edges.slice(0, MAX_POSTS).map((edge: { node: { shortcode: string } }) =>
      `https://www.instagram.com/p/${edge.node.shortcode}/`
    );

    await updatePostsFile(posts);

    return NextResponse.json({
      success: true,
      message: "Posts updated",
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { error: "Failed to update Instagram posts", details: String(error) },
      { status: 500 }
    );
  }
}

async function updatePostsFile(posts: string[]) {
  const filePath = path.join(process.cwd(), "src/data/instagram-posts.json");

  const data = {
    lastUpdated: new Date().toISOString(),
    posts,
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
