#!/bin/sh
# Deploys a built demo (sites/<id>/out) to its own Vercel project "ns-<id>-demo" as a production deployment.
#   sh scripts/deploy-site.sh atelier
# Requires a logged-in Vercel CLI (`npx vercel login`). Build first: npm run build -w sites/<id>
set -e
cd "$(dirname "$0")/.."
id=$1
project="ns-$id-demo"
[ -f "sites/$id/out/index.html" ] || { echo "sites/$id/out is missing. Build the site first." >&2; exit 1; }
# Same Vercel team as the agency project (linked in ../.vercel/project.json), unless VERCEL_ORG_ID is set.
org=$(sed -n 's/.*"orgId":"\([^"]*\)".*/\1/p' ../.vercel/project.json 2>/dev/null)
pid=$(npx -y vercel@latest project inspect "$project" </dev/null 2>&1 | awk '$1=="ID"{print $2}')
[ -n "$pid" ] || { echo "Vercel project $project not found. Create it with: npx vercel project add $project" >&2; exit 1; }
VERCEL_ORG_ID=${VERCEL_ORG_ID:-$org} VERCEL_PROJECT_ID=$pid npx -y vercel@latest deploy "sites/$id/out" --prod --yes </dev/null
