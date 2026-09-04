#!/bin/bash
# =============================================================
# KHOEM-AI Vault — Manifest Generator
# រត់ស្គ្រីបនេះរាល់ដងបន្ថែម/លុបឯកសារ មុននឹង git push
# វានឹងសរសេរ manifest.json ដែល index.html អានដើម្បីបង្ហាញ gallery
# =============================================================

VAULT="$HOME/KHOEM-AI"
cd "$VAULT" || { echo "រកមិនឃើញ $VAULT"; exit 1; }

json_array() {
  local dir="$1"
  local first=1
  echo -n "["
  if [ -d "$dir" ]; then
    for f in "$dir"/*; do
      [ -f "$f" ] || continue
      name=$(basename "$f")
      size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
      [ $first -eq 0 ] && echo -n ","
      first=0
      echo -n "{\"name\":\"$name\",\"size\":$size}"
    done
  fi
  echo -n "]"
}

{
  echo "{"
  echo "  \"generatedAt\": \"$(date -Iseconds)\","
  echo "  \"photos\": $(json_array photos),"
  echo "  \"videos\": $(json_array videos),"
  echo "  \"audio\": $(json_array audio),"
  echo "  \"code\": $(json_array code)"
  echo "}"
} > manifest.json

echo "✅ manifest.json ត្រូវបានធ្វើបច្ចុប្បន្នភាព"
cat manifest.json
