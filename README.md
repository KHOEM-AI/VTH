# VTH

Personal learning portfolio of **Khoem Soksivutha** — built with React + Vite + TypeScript, deployed to GitHub Pages.

## Structure

```
VTH/
├── .github/workflows/deploy.yml   ← auto-deploy on push to main
└── khoem-now/                     ← the actual website project
    ├── src/
    │   ├── App.tsx                ← main page (certificate gallery)
    │   ├── App.css
    │   ├── main.tsx
    │   ├── index.css
    │   └── components/ZoomTool.tsx
    ├── public/certificates/       ← certificate images
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── .gitignore
```

## Run locally

```
cd khoem-now
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions builds and publishes automatically to GitHub Pages.
Enable it once under **Settings → Pages → Source → GitHub Actions**.

Live at: `https://khoem-ai.github.io/VTH/`

# KHOEM-AI Vault — Documentation

**Repository:** github.com/KHOEM-AI/VTH
**Live app:** `khoem-now/index.html`
**Purpose:** កន្លែងផ្ទុកទ្រព្យសម្បត្តិឯកសារផ្ទាល់ខ្លួន — រូបថត វីដេអូ សំឡេង កូដ និងវិញ្ញាបនបត្រ រៀបចំក្នុងកន្លែងតែមួយ។

---

## 1. គោលបំណង (Purpose)

Vault នេះមិនមែនជា cloud storage ធម្មតាទេ — វាជា **ផ្ទាំងបង្ហាញឯកសារផ្ទាល់ខ្លួន (personal asset gallery)** ដែល sync ដោយស្វ័យប្រវត្តិរាល់ពេល push ចូល GitHub repo។ គោលការណ៍ស្នូល៖

> មិនចាំបាច់ upload តាមរយៈ UI ទេ — គ្រាន់តែដាក់ file ចូល folder ត្រឹមត្រូវ រួច `git push` នោះទំព័រនឹងបង្ហាញភ្លាមៗ។

---

## 2. រចនាសម្ព័ន្ធ Folder (Folder Structure)

```
VTH/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← ស្វ័យប្រវត្តិកម្ម deploy ពេល push
├── khoem-now/
│   ├── public/
│   │   └── certificates/       ← វិញ្ញាបនបត្រ (Sololearn ។ល។) ជា .jpg
│   ├── src/                    ← កូដ source (component logic)
│   ├── generate-manifest.sh    ← script បង្កើត manifest.json ស្វ័យប្រវត្តិ
│   ├── index.html              ← ទំព័រ Vault ចម្បង (ដែលបានផ្ញើ)
│   ├── khoem-ai-vault.sh       ← script គ្រប់គ្រង vault
│   ├── organize_vault.sh       ← script រៀបចំ file ចូល folder ត្រឹមត្រូវ
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
```

### ផ្នែកសំខាន់នៃ Storage (4 ប្រភេទចម្បង)

| Section | Folder | Format ដែលទទួល |
|---|---|---|
| 📷 **Photos** | `photos/` | .jpg, .png, .webp |
| 🎬 **Videos** | `videos/` | .mp4, .webm |
| 🎵 **Audio** | `audio/` | .mp3, .wav, .m4a |
| { } **Code** | `code/` | .ts, .tsx, .js, .py, .html ។ល។ |

**ផ្នែកបន្ថែម** (មិនស្ថិតក្នុង tab ចម្បង ប៉ុន្តែជាផ្នែកនៃ Vault ដដែល):
| Section | Folder | មាតិកា |
|---|---|---|
| 🎓 **Certificates** | `public/certificates/` | វិញ្ញាបនបត្រ Sololearn (.jpg) |

---

## 3. របៀបដំណើរការ (How It Works)

```
File ត្រូវបានដាក់ចូល folder ត្រឹមត្រូវ (photos/, videos/, audio/, code/)
        ↓
git push
        ↓
GitHub Actions (.github/workflows/deploy.yml) trigger ស្វ័យប្រវត្តិ
        ↓
generate-manifest.sh រត់ — ស្កេន folder ទាំងអស់ បង្កើត manifest.json
        ↓
index.html ទាញ manifest.json (fetch, cache: no-store)
        ↓
render ជា grid (photos/videos), list (audio), collapsible block (code)
```

**Manifest structure** (`manifest.json` — បង្កើតដោយស្វ័យប្រវត្តិ មិនត្រូវកែដោយដៃ)៖
```json
{
  "photos": [{ "name": "...", "size": 12345 }],
  "videos": [{ "name": "...", "size": 12345 }],
  "audio":  [{ "name": "...", "size": 12345 }],
  "code":   [{ "name": "...", "size": 12345 }]
}
```

---

## 4. កម្រិតការពារ (Protection Levels)

Vault ផ្ទាល់ខ្លួន — ដូច្នេះកម្រិតការពារត្រូវពិចារណាដាច់ដោយឡែកពី KSV (ដែលជា enterprise platform)។ សំណើកម្រិតការពារ៖

| កម្រិត | ការពិពណ៌នា | អនុវត្តន៍ដោយ |
|---|---|---|
| **L0 — Public repo** | បច្ចុប្បន្ន repo GitHub ជា public ដូច្នេះ **អ្នកណាក៏អាចមើលឯកសារបានទាំងអស់** | GitHub repository visibility |
| **L1 — Private repo** | ប្ដូរ repo ទៅជា Private — មានតែ account GitHub ខ្លួនឯង/ដែលបានអញ្ជើញអាចមើលបាន | GitHub Settings → Danger Zone → Change visibility |
| **L2 — Deploy password gate** | ទំព័រ `index.html` បន្ថែម password prompt សាមញ្ញមុននឹងបង្ហាញមាតិកា (client-side, ការពារកម្រិតមូលដ្ឋាន) | បន្ថែម JS logic ក្នុង `index.html` |
| **L3 — Access token / server auth** | ប្រើ backend ដាច់ដោយឡែក ដែលទាមទារ login ត្រឹមត្រូវមុននឹងផ្ដល់ manifest.json + file access | ត្រូវការ backend server (មិនមែន static GitHub Pages ទៀតទេ) |

⚠️ **សំខាន់**៖ បើ repo នៅជា **Public**, រូបភាព វីដេអូ សំឡេង និងកូដទាំងអស់ **អាចមើលបានដោយអ្នកណាក៏បាន** តាមរយៈ GitHub ដោយផ្ទាល់ ទោះបីទំព័រ `index.html` មាន password prompt ក៏ដោយ (ព្រោះ file ដើមនៅតែអាចទាញយកផ្ទាល់ពី repo)។ ការពារពិតប្រាកដត្រូវចាប់ផ្ដើមពី **L1 (Private repo)** ជាមុនសិន។

---

## 5. កម្រិតបន្ទប់ទិន្នន័យ (Data Room / Category Levels)

សំណើរចនាសម្ព័ន្ធពង្រីក បើចង់បន្ថែម "បន្ទប់" ថ្មីនាពេលអនាគត (ក្រៅពី 4 ចម្បង)៖

```
VTH Vault
 ├── 📷 Photos          (public visibility default)
 ├── 🎬 Videos           (public visibility default)
 ├── 🎵 Audio            (public visibility default)
 ├── { } Code            (public visibility default)
 ├── 🎓 Certificates     (achievement records)
 ├── 📄 Documents        (ផែនការ, proposal, PDF — មិនទាន់មាន folder)
 ├── 🔐 Private          (ត្រូវការ L1+ ការពារ — sensitive files)
 └── 🗄️ Archive          (file ចាស់ដែលមិនប្រើប្រចាំថ្ងៃ)
```

ការបន្ថែម "បន្ទប់" ថ្មីម្នាក់ៗ ត្រូវការ៖
1. Folder ថ្មីក្នុង repo (ឧ. `documents/`)
2. កែ `generate-manifest.sh` ឲ្យស្កេន folder ថ្មី
3. កែ `index.html` — បន្ថែម `CATEGORY_META` key ថ្មី + tab UI ថ្មី (តាម pattern ដែលមានស្រាប់សម្រាប់ photos/videos/audio/code)

---

## 6. កម្រិតទំហំ (Storage Size Considerations)

GitHub repository មាន **ដែនកំណត់ជាក់ស្តែង** ដែលត្រូវដឹងទុកមុន៖

| ចំណុច | ដែនកំណត់ | ចំណាំ |
|---|---|---|
| ទំហំ file តែមួយ | 100 MB (hard limit) | GitHub បដិសេធ push បើលើសនេះ |
| ទំហំ file ណែនាំ | < 50 MB | ជៀសវាង warning |
| ទំហំ repo សរុប | មិនកំណត់ច្បាស់ ប៉ុន្តែ **ណែនាំ < 1 GB** | Repo ធំពេកធ្វើឲ្យ clone/fetch យឺត |
| Bandwidth (GitHub Pages) | 100 GB/ខែ (soft limit) | បើប្រើ GitHub Pages ដើម្បី host |

**អនុសាសន៍**៖
- វីដេអូធំៗ (> 50 MB) មិនគួរដាក់ផ្ទាល់ក្នុង repo ទេ — ប្រើ **Git LFS** (Large File Storage) ជំនួសវិញ
- រូបភាព គួរបង្រួម (compress) មុននឹង push ដើម្បីសន្សំទំហំ និងលឿនក្នុងការផ្ទុក

---

## 7. កម្រិតផ្នែក (Section Access Levels — Future Design)

សំណើសម្រាប់ថ្ងៃក្រោយ បើចង់បន្ថែម user account ជាមួយ Vault (ដូច KSV)៖

| Role | Photos | Videos | Audio | Code | Private |
|---|---|---|---|---|---|
| **Owner** (ខ្លួនឯង) | អាចមើល/លុប/បន្ថែម | អាចមើល/លុប/បន្ថែម | អាចមើល/លុប/បន្ថែម | អាចមើល/លុប/បន្ថែម | អាចមើល/លុប/បន្ថែម |
| **Viewer** (ណែនាំចែក) | មើលបានតែ | មើលបានតែ | មើលបានតែ | មើលបានតែ | ❌ |
| **Public** (បើ repo public) | មើលបានតែ | មើលបានតែ | មើលបានតែ | មើលបានតែ | ❌ |

---

## 8. Deployment (`.github/workflows/deploy.yml`)

ធ្វើការស្វ័យប្រវត្តិកម្មនៅរាល់ពេល push ចូល `main` branch៖
```
push → GitHub Actions triggered
     → generate-manifest.sh runs (scans photos/, videos/, audio/, code/)
     → manifest.json regenerated
     → deployed to GitHub Pages (ឬ hosting environment ដែលកំណត់)
```

---

## 9. សេចក្តីសង្ខេប (Summary)

Vault នេះជា **static, file-based personal archive** ដែលមិនត្រូវការ database ឬ backend ស្មុគស្មាញ — គ្រាន់តែ folder + manifest.json + `index.html` ។ ចំណុចខ្សោយសំខាន់បំផុតឥឡូវនេះគឺ **Repository visibility (Public)** — ណែនាំប្ដូរទៅ Private ជាដំបូងបំផុត បើមានឯកសារផ្ទាល់ខ្លួនរសើប។

---

*ឯកសារនេះសរសេរជា documentation reference ប៉ុណ្ណោះ — មិនមានកែ code ណាមួយក្នុង `index.html`, `generate-manifest.sh`, ឬ `deploy.yml` ដែលមានស្រាប់ទេ។*
