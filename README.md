TODO: 

GENERELLT:
(x) SERVA SITEN MED HJÄLP AV NODE 5080 med hjälp av Express.
() Alla dependencies installeras när man kör “npm install” (måste finnas i package.json).
(x) Servern går att starta med “npm start”.
() Test ska gå att köra med “npm test”.

SIDA 1: SPELET
() Spelet ska utvecklas fullstack, med GUI utvecklat i React, och delar av spellogiken på backend via ett API.
() Spelet väljer ut ett slumpmässigt ord varje gång spelet startar – användaren kan bestämma hur många bokstäver ordet ska ha och om det får innehålla bokstäver som upprepas
() Användaren gissar vad ordet är genom att skriva in det i ett fritextfält
() Spelet ger feedback enligt feedback-algoritmen, genom att visa användarens bokstäver i grönt (correct), gult (misplaced) eller rött (incorrect)
() När användaren gissar rätt ord är spelet över
(x) Det slumpmässiga urvalet av ord ska ske på servern via ett API-anrop. En datakälla kan vara den datafil som finns på https://github.com/dwyl/english-words
() Efter att användaren klarat spelet ska hen få möjlighet att ange sitt namn och skicka in resultatet till en highscore-lista. Den data som skickas in ska inkludera namnet, tiden från att spelet startade till att det slutade, gissningarna, samt inställningarna avseende ordets längd och unika bokstäver.
((VG)) Spelet och API ska implementeras på ett sådant sätt att det inte är möjligt att fuska, genom att backend ansvarar för feedback och tidtagning från att ordet väljs ut, till att spelet är över

TDD: 
Backend:
1. API laddar in orden. - KLART
2. Ett av orden är det "rätta". 
3. En timer för spelet som startar när man klickar på start och avslutas när man gissat rätt.
4. Lagra användarens information (high-score, namn, och tid). 

TDD:
Frontend: 
1. Det ska gå att välja längd på ordet. 
2. Gå att gissa på ord genom att skriva.
3. Indikator på vilka bokstäver som är rätt/fel/felplacerade.
4. Fylla i sin information när spelet är över. 

SIDA 2: OM PROJEKTET (STATISK)
() STATISK HTML-SIDA OM PROJEKTET
() GÅ ATT KLICKA IN SIG PÅ 
() INDIKATOR PÅ ATT MAN ÄR PÅ SIDAN

SIDA 3: HIGH-SCORE (SSR)
() På en separat sida/route ska en highscore-lista visas
() Highscorelistan ska lagras beständigt i en databas.
() Listan ska server-siderenderas

TDD: 
1. Ta emot informationen som lagrats om spelaren. 
2. En top-lista med high-schores. 
3. Lagra highscorelistan i en databas. 
