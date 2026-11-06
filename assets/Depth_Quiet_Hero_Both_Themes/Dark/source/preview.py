from pathlib import Path
import asyncio
from PIL import Image, ImageOps, ImageDraw
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
        page=await b.new_page(viewport={'width':1600,'height':900},device_scale_factor=1)
        await page.set_content((ROOT/'index.html').read_text(),wait_until='load')
        for t in [1.1,3.8,5.6,7.5,9.1]:
            await page.evaluate('(t)=>window.renderAt(t)',t)
            await page.screenshot(path=str(ROOT/'preview'/f'frame-{t:.1f}.png'),animations='disabled')
        await b.close()
    imgs=[Image.open(ROOT/'preview'/f'frame-{t:.1f}.png').convert('RGB') for t in [1.1,3.8,5.6,7.5,9.1]]
    thumbs=[]
    for img in imgs:
        img.thumbnail((740,416))
        thumbs.append(img)
    canvas=Image.new('RGB',(1520,1324),(17,20,23));d=ImageDraw.Draw(canvas)
    for i,img in enumerate(thumbs):
        x=12+(i%2)*760; y=14+(i//2)*440
        canvas.paste(img,(x,y))
    canvas.save(ROOT/'preview'/'storyboard.png',quality=91)
if __name__=='__main__':asyncio.run(main())
