#!/usr/bin/env node
// ---------------------------------------------------------------
// gen-contrib-3d.mjs — generates a hand-crafted isometric 3D
// "contribution skyline" SVG + a stats strip, in dark & light
// variants, from GitHub contribution data.
//
// Usage:  node scripts/gen-contrib-3d.mjs [outDir]
//   CI_FETCH=1  -> fetch fresh data from the public contributions
//                  API (use in GitHub Actions). Otherwise falls
//                  back to the embedded snapshot below.
// ---------------------------------------------------------------
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const USER = "mohammadpooshesh"
const OUT = process.argv[2] || "."

// Snapshot of non-zero days (2025-07-20 .. 2026-07-21), total = 415
const EMBED_START = "2025-07-20"
const EMBED_DAYS = 367
const EMBED = {
  "2025-07-28": 1, "2025-07-29": 1, "2025-08-13": 1, "2025-08-25": 2,
  "2025-08-28": 2, "2025-08-30": 6, "2025-08-31": 2, "2025-09-02": 4,
  "2025-09-04": 1, "2025-09-09": 3, "2025-09-10": 3, "2025-09-20": 8,
  "2025-09-21": 2, "2025-09-22": 5, "2025-09-23": 8, "2025-10-02": 3,
  "2025-10-18": 1, "2025-10-19": 4, "2025-10-20": 5, "2025-10-22": 5,
  "2025-10-25": 4, "2025-11-01": 2, "2025-11-03": 1, "2025-11-04": 4,
  "2025-11-05": 1, "2025-11-06": 12, "2025-11-07": 13, "2025-11-08": 7,
  "2025-11-12": 1, "2025-11-17": 12, "2025-11-18": 14, "2025-11-22": 2,
  "2025-11-23": 1, "2025-11-24": 5, "2025-11-25": 2, "2025-12-01": 3,
  "2025-12-02": 2, "2025-12-03": 1, "2025-12-06": 1, "2025-12-10": 1,
  "2025-12-11": 1, "2025-12-13": 1, "2025-12-15": 1, "2025-12-16": 1,
  "2025-12-23": 1, "2025-12-27": 1, "2026-01-05": 3, "2026-01-29": 1,
  "2026-01-30": 1, "2026-02-01": 2, "2026-02-12": 2, "2026-02-13": 2,
  "2026-02-15": 1, "2026-02-20": 1, "2026-02-21": 2, "2026-02-22": 1,
  "2026-02-23": 10, "2026-02-26": 1, "2026-04-12": 1, "2026-04-17": 7,
  "2026-06-01": 3, "2026-06-26": 4, "2026-06-27": 17, "2026-06-28": 8,
  "2026-07-01": 1, "2026-07-02": 5, "2026-07-03": 4, "2026-07-04": 17,
  "2026-07-05": 8, "2026-07-06": 116, "2026-07-07": 1, "2026-07-08": 2,
  "2026-07-10": 7, "2026-07-11": 2, "2026-07-13": 1, "2026-07-14": 6,
  "2026-07-15": 4, "2026-07-16": 4, "2026-07-17": 3, "2026-07-18": 1,
  "2026-07-19": 2, "2026-07-20": 1, "2026-07-21": 1,
}

async function getData() {
  if (process.env.CI_FETCH === "1") {
    try {
      const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const j = await r.json()
      if (Array.isArray(j.contributions) && j.contributions.length > 300) {
        return j.contributions.map((c) => ({ date: c.date, count: c.count }))
      }
      throw new Error("unexpected payload")
    } catch (e) {
      console.error("fetch failed, using embedded snapshot:", e.message)
    }
  }
  const out = []
  const d0 = new Date(EMBED_START + "T00:00:00Z")
  for (let i = 0; i < EMBED_DAYS; i++) {
    const d = new Date(d0.getTime() + i * 86400000)
    const key = d.toISOString().slice(0, 10)
    out.push({ date: key, count: EMBED[key] || 0 })
  }
  return out
}

const level = (c) => (c === 0 ? 0 : c < 5 ? 1 : c < 10 ? 2 : c < 13 ? 3 : 4)
const barH = (c) => (c === 0 ? 3 : Math.round(6 + 11 * Math.log2(1 + c)))

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16)
  const ch = (x) => Math.max(0, Math.min(255, Math.round(x * f)))
  const r = ch(n >> 16), g = ch((n >> 8) & 255), b = ch(n & 255)
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
}

const THEMES = {
  dark: {
    tops: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    sideR: 0.72, sideL: 0.5,
    emptyStroke: "#21262d",
    title: "#e6edf3", text: "#8b949e", accent: "#5E9FE8", peak: "#39d353",
    chipFill: "#0d1420", chipStroke: "#22304E",
    nums: ["#5E9FE8", "#39d353", "#DE9255", "#BF8EDA", "#4FB9C9"],
  },
  light: {
    tops: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    sideR: 0.82, sideL: 0.66,
    emptyStroke: "#d0d7de",
    title: "#1f2328", text: "#57606a", accent: "#0969DA", peak: "#1a7f37",
    chipFill: "#f6f8fa", chipStroke: "#d0d7de",
    nums: ["#0969DA", "#1a7f37", "#bc4c00", "#8250df", "#1b7c83"],
  },
}

function skyline(days, t) {
  const firstDow = new Date(days[0].date + "T00:00:00Z").getUTCDay()
  const weeks = Math.ceil((firstDow + days.length) / 7)
  const OX = 14 * 6 + 34
  const OY = 96
  const W = OX + 14 * (weeks - 1) + 14 + 26
  const H = OY + 7 * (weeks - 1 + 6) + 14 + 3 + 52

  const cells = days.map((d, i) => {
    const dow = (firstDow + i) % 7
    const week = Math.floor((firstDow + i) / 7)
    return { ...d, dow, week, lv: level(d.count), h: barH(d.count) }
  })
  cells.sort((a, b) => a.week + a.dow - (b.week + b.dow))

  const total = days.reduce((s, d) => s + d.count, 0)
  const peak = cells.reduce((m, c) => (c.count > m.count ? c : m), cells[0])

  const defs = new Map()
  let bars = "", peakBars = ""
  for (const c of cells) {
    const id = `b${c.lv}-${c.h}`
    if (!defs.has(id)) {
      const top = t.tops[c.lv]
      const stroke = c.lv === 0 ? ` stroke="${t.emptyStroke}" stroke-width="0.5"` : ""
      defs.set(id,
        `<g id="${id}">` +
        `<path d="M-14 7v${c.h}l14 7v-${c.h}z" fill="${shade(top, t.sideL)}"/>` +
        `<path d="M14 7v${c.h}l-14 7v-${c.h}z" fill="${shade(top, t.sideR)}"/>` +
        `<path d="M0 0l14 7-14 7-14-7z" fill="${top}"${stroke}/>` +
        `</g>`)
    }
    const gx = OX + 14 * (c.week - c.dow)
    const gy = OY + 7 * (c.week + c.dow)
    const u = `<use href="#${id}" x="${gx}" y="${gy - c.h}"/>`
    if (c.lv === 4) peakBars += u
    else bars += u
  }

  // month labels along the bottom-left edge of the grid
  let months = ""
  const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  let lastW = -10
  for (const c of cells) {
    if (c.date.slice(8) === "01" && c.week > lastW + 2 && c.week < weeks - 1) {
      lastW = c.week
      const x = OX + 14 * (c.week - 7.6)
      const y = OY + 7 * (c.week + 7.6) + 14
      months += `<text x="${x}" y="${y}" transform="rotate(26.57 ${x} ${y})" font-size="11" fill="${t.text}" text-anchor="middle">${MN[+c.date.slice(5, 7) - 1]}</text>`
    }
  }

  // peak annotation
  const px = OX + 14 * (peak.week - peak.dow)
  const py = OY + 7 * (peak.week + peak.dow) - peak.h
  const peakLabel =
    `<text x="${px}" y="${py - 12}" font-size="12" font-weight="700" fill="${t.peak}" text-anchor="middle">\u25b2 ${peak.count} in one day</text>`

  // legend
  let legend = `<text x="${W - 150}" y="40" font-size="11" fill="${t.text}" text-anchor="end">less</text>`
  for (let l = 0; l <= 4; l++) {
    const lx = W - 138 + l * 22
    legend +=
      `<path d="M${lx - 9} ${39}v4l9 4.5v-4z" fill="${shade(t.tops[l], t.sideL)}"/>` +
      `<path d="M${lx + 9} ${39}v4l-9 4.5v-4z" fill="${shade(t.tops[l], t.sideR)}"/>` +
      `<path d="M${lx} ${34.5}l9 4.5-9 4.5-9-4.5z" fill="${t.tops[l]}"${l === 0 ? ` stroke="${t.emptyStroke}" stroke-width="0.5"` : ""}/>`
  }
  legend += `<text x="${W - 138 + 5 * 22}` + `" y="46" font-size="11" fill="${t.text}">more</text>`

  const from = days[0].date, to = days[days.length - 1].date
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Segoe UI, Ubuntu, sans-serif">\n<text x="22" y="34" font-size="20" font-weight="700" fill="${t.title}">${total.toLocaleString("en-US")} contributions</text>\n<text x="22" y="54" font-size="12" fill="${t.text}">${from} \u2192 ${to} \u00b7 rendered as an isometric skyline</text>\n<defs>${[...defs.values()].join("")}</defs>\n${legend}\n${bars}\n<g>${peakBars}<animate attributeName="opacity" values="0.82;1;0.82" dur="4s" repeatCount="indefinite"/></g>\n${peakLabel}\n${months}\n</svg>`
}

function statsStrip(days, t) {
  const total = days.reduce((s, d) => s + d.count, 0)
  const active = days.filter((d) => d.count > 0).length
  let cur = 0
  for (let i = days.length - 1; i >= 0 && days[i].count > 0; i--) cur++
  let longest = 0, run = 0
  for (const d of days) { run = d.count > 0 ? run + 1 : 0; if (run > longest) longest = run }
  const peak = Math.max(...days.map((d) => d.count))

  const items = [
    [total.toLocaleString("en-US"), "contributions \u00b7 last year"],
    [String(active), "active days"],
    [`${cur} \ud83d\udd25`, "current streak"],
    [String(longest), "longest streak"],
    [String(peak), "best single day"],
  ]
  const W = 1000, CW = 180, GAP = 17, X0 = (W - (CW * 5 + GAP * 4)) / 2
  let chips = ""
  items.forEach(([num, label], i) => {
    const x = X0 + i * (CW + GAP)
    chips +=
      `<rect x="${x}" y="18" width="${CW}" height="88" rx="14" fill="${t.chipFill}" stroke="${t.chipStroke}"/>` +
      `<text x="${x + CW / 2}" y="62" font-size="30" font-weight="800" fill="${t.nums[i]}" text-anchor="middle">${num}</text>` +
      `<text x="${x + CW / 2}" y="88" font-size="12.5" fill="${t.text}" text-anchor="middle">${label}</text>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 124" width="${W}" height="124" font-family="Segoe UI, Ubuntu, sans-serif">${chips}</svg>`
}

const days = await getData()
mkdirSync(OUT, { recursive: true })
for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(OUT, `contrib-3d-${name}.svg`), skyline(days, t))
  writeFileSync(join(OUT, `contrib-stats-${name}.svg`), statsStrip(days, t))
}
console.log("done:", OUT, days.length, "days,", days.reduce((s, d) => s + d.count, 0), "contributions")
