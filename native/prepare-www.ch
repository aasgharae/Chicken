#!/usr/bin/env bash
# index.html رو برای نسخه‌های APK و EXE آماده می‌کنه (sql.js به‌صورت لوکال، بدون نیاز به اینترنت)
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
( cd "$TMP" && npm init -y >/dev/null && npm install sql.js@1.8.0 --no-audit --no-fund >/dev/null )
for APP in android-app electron-app; do
  W="$ROOT/native/$APP/www"
  rm -rf "$W" && mkdir -p "$W"
  cp "$ROOT/index.html" "$W/index.html"
  sed -i 's#https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/##g' "$W/index.html"
  cp "$TMP/node_modules/sql.js/dist/sql-asm.js" "$W/sql-wasm.js"
done
echo "www ready"
