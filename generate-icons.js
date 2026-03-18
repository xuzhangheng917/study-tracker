import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

const svg = readFileSync('./public/icon.svg')

// 生成各种尺寸的图标
const sizes = [192, 512]

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(`./public/pwa-${size}x${size}.png`)
    console.log(`Generated ${size}x${size}`)
  }
  
  // Apple touch icon
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile('./public/apple-touch-icon.png')
  console.log('Generated apple-touch-icon.png')
  
  // Favicon
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile('./public/favicon.ico')
  console.log('Generated favicon.ico')
}

generateIcons().catch(console.error)