#!/usr/bin/env python3
"""Reproducible browser-to-video renderer for Depth's product concept animation."""
from pathlib import Path
import asyncio,subprocess,sys
from playwright.async_api import async_playwright
from PIL import Image,ImageOps,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
FPS=24
DURATION=13
async def main():
    out=ROOT/'video'/'depth-quiet-hero-light.mp4'
    out.parent.mkdir(exist_ok=True)
    html=(ROOT/'index.html').read_text()
    proc=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','mjpeg','-r',str(FPS),'-i','-','-vf','scale=1920:1080:flags=lanczos,format=yuv420p','-c:v','libx264','-preset','medium','-crf','20','-movflags','+faststart','-an',str(out)],stdin=subprocess.PIPE,stderr=subprocess.PIPE)
    try:
        async with async_playwright() as p:
            browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
            page=await browser.new_page(viewport={'width':1600,'height':900},device_scale_factor=1)
            await page.set_content(html,wait_until='load')
            await page.evaluate('(t)=>window.renderAt(t)',0)
            for j in range(FPS*DURATION):
                t=j/FPS
                await page.evaluate('(t)=>window.renderAt(t)',t)
                shot=await page.screenshot(type='jpeg',quality=93,animations='disabled')
                proc.stdin.write(shot)
                if j%72==0:print(f'frame {j+1}/{FPS*DURATION}',flush=True)
            await browser.close()
        proc.stdin.close()
        err=proc.stderr.read(); ret=proc.wait()
        if ret: raise RuntimeError(err.decode(errors='replace'))
        print('created',out, out.stat().st_size)
    finally:
        if proc.poll() is None: proc.kill()
if __name__=='__main__': asyncio.run(main())
