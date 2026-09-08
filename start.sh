#!/usr/bin/env bash

# Forge Champions - Script de inicio rápido

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "🚀 Iniciando Forge Champions en http://localhost:3000..."

cd "$DIR"

if [ ! -d "$DIR/node_modules" ]; then
    echo "Instalando dependencias npm..."
    npm install
fi

npm run dev -- -p 3000
