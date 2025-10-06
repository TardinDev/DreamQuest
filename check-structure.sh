#!/bin/bash

# Script de vérification de la structure DreamQuest
echo "🔍 Vérification de la structure du projet..."
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Compteurs
errors=0

# 1. Vérifier que src/ existe dans frontend
echo "1️⃣  Vérification structure frontend/src/..."
if [ -d "frontend/src" ]; then
    echo -e "${GREEN}✓${NC} frontend/src/ existe"
else
    echo -e "${RED}✗${NC} frontend/src/ manquant"
    errors=$((errors+1))
fi

# 2. Vérifier les dossiers principaux
echo ""
echo "2️⃣  Vérification dossiers principaux..."
for dir in frontend api workers unity infra docs; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir/"
    else
        echo -e "${RED}✗${NC} $dir/ manquant"
        errors=$((errors+1))
    fi
done

# 3. Vérifier absence de doublons Vite
echo ""
echo "3️⃣  Vérification absence fichiers Vite à la racine..."
vite_files=("index.html" "vite.config.ts" "tsconfig.app.json" "tsconfig.node.json")
for file in "${vite_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${RED}✗${NC} Fichier obsolète trouvé: $file"
        errors=$((errors+1))
    else
        echo -e "${GREEN}✓${NC} Pas de $file"
    fi
done

# 4. Compter les fichiers sources
echo ""
echo "4️⃣  Comptage fichiers sources..."
tsx_count=$(find . -name "*.tsx" ! -path "*/node_modules/*" ! -path "*/.next/*" | wc -l | tr -d ' ')
ts_count=$(find . -name "*.ts" ! -path "*/node_modules/*" ! -path "*/.next/*" ! -name "*.tsx" | wc -l | tr -d ' ')
py_count=$(find . -name "*.py" ! -path "*/node_modules/*" | wc -l | tr -d ' ')
cs_count=$(find . -name "*.cs" | wc -l | tr -d ' ')

echo "  - Fichiers .tsx: $tsx_count"
echo "  - Fichiers .ts: $ts_count"
echo "  - Fichiers .py: $py_count"
echo "  - Fichiers .cs: $cs_count"

# 5. Vérifier les fichiers clés
echo ""
echo "5️⃣  Vérification fichiers clés..."
key_files=(
    "frontend/package.json"
    "frontend/src/app/page.tsx"
    "frontend/src/components/DreamForm.tsx"
    "api/main.py"
    "api/schemas.py"
    "workers/orchestrator.py"
    "unity/Assets/Scripts/BlueprintLoader.cs"
)

for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file manquant"
        errors=$((errors+1))
    fi
done

# 6. Vérifier node_modules
echo ""
echo "6️⃣  Vérification dépendances..."
if [ -d "node_modules" ] && [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dépendances installées (racine + frontend)"
elif [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dépendances racine installées"
else
    echo -e "${RED}✗${NC} Dépendances non installées"
    errors=$((errors+1))
fi

# Résultat final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ Structure validée ! Aucune erreur.${NC}"
    echo ""
    echo "🚀 Prêt à lancer: npm run dev:frontend"
else
    echo -e "${RED}❌ $errors erreur(s) détectée(s)${NC}"
    echo ""
    echo "Consultez STRUCTURE.md pour la structure attendue"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
