English patch installation instruction available [here](https://github.com/klesun/rance-10-gpt-mtl/releases) (Releases page)
__________
God bless the soul of the author of this article:
https://haniwa.technology/alice-tools/README-ain.html

So, apparently, with [alice-tools](https://github.com/nunuhara/alice-tools) it's _very_ easy to edit the text in the game to translate it.

And, as we all know, nowadays ChatGPT is a thing so it should be rather easy to translate the game with rather fine quality.

I'll put here the scripts and their output.

Youtube recordings of the walkthrough with this English patch:
https://www.youtube.com/playlist?list=PL_mejOc9nYCLg6V_FI9ISiafdjH2CW2Mv

You can obtain the game copy here: (please, support the developer!)
https://www.dlsite.com/pro/work/=/product_id/VJ011759.html

Alternative link (v1.00, not the latest game version):
magnet:?xt=urn:btih:56a41b8aca7f2753ad58f96d69def852ddf7dd41&dn=Rance%2010&xl=4262760435

Before:
<img width="1186" height="834" alt="image" src="https://github.com/user-attachments/assets/53ffc48b-1b7c-469f-a79a-b31c248846a2" />


After:
<img width="1109" height="844" alt="image" src="https://github.com/user-attachments/assets/5233c5d3-83e8-4e20-807d-a0cbef5e5c81" />


______________________________________

## Steps to Build

1. Run `npm i` to install dependencies (install nodejs if needed)
2. Run `node regenerate_aai_txt.js` to produce the `regenerated.ain.txt` file
(assuming that game installation directory is `C:\Program Files\AliceSoft\ランス１０`)
3. Run `alice ain edit -t regenerated.ain.txt -o "C:\Program Files\AliceSoft\ランス１０\Rance10.ain" "C:\Program Files\AliceSoft\ランス１０\Rance10.ain"` (install alice-tools if needed)
4. Run `alice ex build -o "C:\Program Files\AliceSoft\ランス１０\Rance10EX.ex" Rance10EX/main.x`
