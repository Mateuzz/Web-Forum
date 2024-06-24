#!/usr/bin/env sh

echo "Info: Building the source code"
npm run build-only
echo "Info: Starting nginx"
nginx -g "daemon off;"
