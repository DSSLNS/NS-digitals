#!/bin/sh
# Scaffolds a demo site: scripts/new-site.sh <id> <case-study-slug> <Brand name> <photo-prefix...>
set -e
cd "$(dirname "$0")/.."
id=$1; slug=$2; brand=$3; shift 3
d=sites/$id
mkdir -p $d/src/app $d/public/photos
cat > $d/package.json <<JSON
{
  "name": "@ns-demos/$id",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@ns-demos/shared": "*",
    "lucide-react": "^1.63.0",
    "next": "^16.4.3",
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24.19.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
JSON
cat > $d/next.config.ts <<'TS'
import path from "node:path";
import type { NextConfig } from "next";

/** Static export: the site is plain HTML/CSS/JS, served by Vercel with clean URLs (see public/vercel.json). */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@ns-demos/shared"],
  poweredByHeader: false,
  turbopack: { root: path.resolve(process.cwd(), "../..") },
};

export default nextConfig;
TS
cat > $d/tsconfig.json <<'JSON'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
JSON
printf 'const config = { plugins: { "@tailwindcss/postcss": {} } };\n\nexport default config;\n' > $d/postcss.config.mjs
cat > $d/public/vercel.json <<'JSON'
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" }
      ]
    }
  ]
}
JSON
printf '@import "tailwindcss";\n' > $d/src/app/globals.css
cat > $d/src/app/layout.tsx <<TSX
import type { Metadata } from "next";
import { DemoBanner } from "@ns-demos/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "$brand", template: "%s | $brand" },
  description: "$brand: a live concept demo by NS Digital Solutions.",
  robots: { index: false, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoBanner brand="$brand" caseStudySlug="$slug" />
        {children}
      </body>
    </html>
  );
}
TSX
cat > $d/src/app/page.tsx <<TSX
export default function Home() {
  return <h1>$brand</h1>;
}
TSX
for prefix in "$@"; do cp ../public/images/photos/$prefix*.jpg $d/public/photos/ 2>/dev/null || true; done
echo "created $d"
