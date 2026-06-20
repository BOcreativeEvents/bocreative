import { readFileSync, writeFileSync } from 'fs'

const IMG_BASE = 'https://res.cloudinary.com/dwlznbqoi/image/upload/Events/'
const VID_BASE = 'https://res.cloudinary.com/dwlznbqoi/video/upload/blueocean/'

// Manual mapping: local video path → cloudinary public_id slug
const VIDEO_MAP = {
  '/event videos/Sckylers/sckylers recap 2.mp4': VID_BASE + 'sckylers-recap-2',
  '/event videos/Sckylers/sckylers Story 3.mp4': VID_BASE + 'sckylers-story-3',
  '/event videos/Sckylers/sckylers Story 5.mp4': VID_BASE + 'sckylers-story-5',
  '/event videos/Wegovy/wegovy-1.mp4': VID_BASE + 'wegovy-1',
  '/event videos/Wegovy/wegovy-2.mp4': VID_BASE + 'wegovy-2',
  '/event videos/Wegovy/wegovy-3.mp4': VID_BASE + 'wegovy-3',
  '/event videos/Wegovy/wegovy-4.mp4': VID_BASE + 'wegovy-4',
  '/event videos/Wegovy Tour - Montaza/Wegovy_Alex_Recap_V05.mp4': VID_BASE + 'wegovy-montaza-recap',
  '/event videos/Wegovy Tour - Montaza/Story 1.mp4': VID_BASE + 'wegovy-montaza-story-1',
  '/event videos/Wegovy Tour - Montaza/Story_3.mp4': VID_BASE + 'wegovy-montaza-story-3',
  '/event videos/Wegovy Tour - Montaza/Story_06-7.mp4': VID_BASE + 'wegovy-montaza-story-6-7',
  '/event videos/Wegovy Tour - Montaza/Story_08.mp4': VID_BASE + 'wegovy-montaza-story-8',
  '/event videos/Wegovy Tour - Montaza/Story_11.mp4': VID_BASE + 'wegovy-montaza-story-11',
  '/event videos/Wegovy Tour - Montaza/Story_12.mp4': VID_BASE + 'wegovy-montaza-story-12',
  '/event videos/Wegovy Tour - Montaza/Story_13.mp4': VID_BASE + 'wegovy-montaza-story-13',
  '/event videos/Wegovy Tour - Montaza/Story_14_V02.mp4': VID_BASE + 'wegovy-montaza-story-14',
  '/event videos/Wegovt Tour - Citadel Saladin/WEGOVY_CITADEL_V01.mp4': VID_BASE + 'wegovy-citadel-recap',
  '/event videos/Wegovt Tour - Citadel Saladin/S01_V01.mp4': VID_BASE + 'wegovy-citadel-s01',
  '/event videos/Wegovt Tour - Citadel Saladin/S03_V01.mp4': VID_BASE + 'wegovy-citadel-s03',
  '/event videos/Wegovt Tour - Citadel Saladin/S05_V01.mp4': VID_BASE + 'wegovy-citadel-s05',
  '/event videos/Wegovt Tour - Citadel Saladin/S06+S07_V01.mp4': VID_BASE + 'wegovy-citadel-s06-s07',
  '/event videos/Wegovt Tour - Citadel Saladin/S09+S10+S11_V01.mp4': VID_BASE + 'wegovy-citadel-s09-s11',
  '/event videos/Wegovt Tour - Citadel Saladin/S12-FIANLE.mp4': VID_BASE + 'wegovy-citadel-s12-finale',
  '/event videos/Lipton Appreciation Event/7-5 lipton event-.mp4': VID_BASE + 'lipton',
  '/event videos/Arabtec/arabtec video.mp4': VID_BASE + 'arabtec',
  '/event videos/Home Town/Home Town.mp4': VID_BASE + 'hometown',
  '/event videos/Ozempic/Ozempic event-.mp4': VID_BASE + 'ozempic',
  '/event videos/Food Bank/RECAP BANK FOOD.mp4': VID_BASE + 'food-bank',
  '/event videos/British/KBP reel 2.mp4': VID_BASE + 'british-reel-2',
  '/event videos/British/KBP reel 3.mp4': VID_BASE + 'british-reel-3',
  '/event videos/Qatar Embassy - National Day Event/Qatar_national_day_celebration__2022.mp4': VID_BASE + 'qatar-2022',
  '/event videos/Medfest 5th/MEDFEST-2025-Recap-1.mp4': VID_BASE + 'medfest-2025',
  '/event videos/Medfest 5th/Medfest_6th.mp4': VID_BASE + 'medfest-6th',
  '/event videos/Medfest 5th/MEDFEST.mp4': VID_BASE + 'medfest-5th',
  '/event videos/Signal/signal event Video.mp4': VID_BASE + 'signal',
  '/event videos/Shell STLC/shell Long Version.mp4': VID_BASE + 'shell-stlc',
  '/event videos/Saxenda 4th Annivesrasy/Saxenda 4th Video.mp4': VID_BASE + 'saxenda',
  '/event videos/Main Marks/main_marks_broker event.mp4': VID_BASE + 'main-marks',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 1.mp4': VID_BASE + 'marriott-1',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 2.mp4': VID_BASE + 'marriott-2',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 3.mp4': VID_BASE + 'marriott-3',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 4.mp4': VID_BASE + 'marriott-4',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 5.mp4': VID_BASE + 'marriott-5',
  '/event videos/Marriot Residence/Marriot new/Marriot Video 6.mp4': VID_BASE + 'marriott-6',
  '/event videos/Obsidier Towers/dubai_development____obsidier_launch_event.mp4': VID_BASE + 'obsidier',
  '/event videos/Egyptian Obesity Summit/novo_nordisk____eos_3rd.mp4': VID_BASE + 'egyptian-obesity-summit',
  '/event videos/Notion/Notion_Video_1.mp4': VID_BASE + 'notion-1',
  '/event videos/Notion/Notion_Video_2.mp4': VID_BASE + 'notion-2',
  '/event videos/Notion/Notion_Video_3.mp4': VID_BASE + 'notion-3',
}

const filePath = '/Users/domio/Desktop/Claude Skill/blueocean/lib/events.ts'
let content = readFileSync(filePath, 'utf8')

// Replace image paths: '/event photos/X' → cloudinary image URL
content = content.replace(/['"]\/event photos\/([^'"]+)['"]/g, (match, path) => {
  const quote = match[0]
  return `${quote}${IMG_BASE}${path}${quote}`
})

// Replace known video paths
for (const [local, remote] of Object.entries(VIDEO_MAP)) {
  const escaped = local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  content = content.replace(new RegExp(`['"]${escaped}['"]`, 'g'), (match) => {
    const quote = match[0]
    return `${quote}${remote}${quote}`
  })
}

writeFileSync(filePath, content, 'utf8')
console.log('events.ts updated successfully')

// Report any remaining local video paths
const remaining = [...content.matchAll(/['"]\/event videos\/([^'"]+)['"]/g)]
if (remaining.length) {
  console.log('\nUnmapped video paths (still local):')
  remaining.forEach(m => console.log(' ', m[0]))
} else {
  console.log('All video paths mapped!')
}
