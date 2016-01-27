# Studio-Fonkel
## Instructies

Note:
**Alle** afbeeldingen moeten in het mapje **/img** gezet worden.

#Algemene instellingen	
Om dit aan te passen ga naar **_config.yml** in de **root** van de website.

- **name**: Studio Fonkel
- **description**: Studio Fonkel website in Jekyll
- **logan**: Gewone jongens (en stiekem een paar meiden) die mooie dingen maken.
- **case_slogan**: Geen standaars oplossingen. Streven naarhet beste rendement, voor de korte en lange termijn. **(Case slogan komt op cases overzicht pagina)**
- **blog_slogan**: Inspirerende blogs die jou helpen richting te geven aan je onderneming. **(Blog slogan komt op blogs overzicht pagina)**
- **author**:
- **name**: Studio Fonkel

#Cases
- **title**:  "title"
- **html_title**: "Archetypen: je merk`<span class='break'>-<br></span>`persoonlijkheid als strategie" (De html_title is er om lange worden in een title een break te geven, zodat deze goed weergegeven wordt | `<span class='break'>-<br></span>`)
- **subtitle**: "subtitle"
- **header-img**: “/img/**afbeeldingnaam.extensie**”
- **header-img-alt**: “Alt tekst voor afbeelding"
- **date**: 2015-12-18 10:27:00 **(Geeft de volgorde aan op de cases pagina | Nieuw eerst)**
- **author**: Theo
- **categories**:  **(Dit komt bij casespagina als link | NIET VERPLICHT)**
- Website
- Applicatie
- **background-position**: "20% 30%” **(Als de afbeelding anders gepositioneerd moet worden, horizontaal, verticaal | NIET VERPLICHT | Standaard “CENTER 40%”)**
- **front**: yes **(Bij een nieuwe case front op yes zetten als je deze op de voorpagina wilt)**

#Blogs
- **title**:  "title"
- **html_title**: "Archetypen: je merk`<span class='break'>-<br></span>`persoonlijkheid als strategie" (De html_title is er om lange worden in een title een break te geven, zodat deze goed weergegeven wordt | `<span class='break'>-<br></span>`)
- **subtitle**: "subtitle"
- **header-img**: “/img/afbeeldingsnaam.extensie"
- **header-img-alt**: “Alt tekst voor afbeelding"
- **date**: 2015-12-18 10:27:00 **(Geeft de volgorde aan op de blogs pagina | Nieuw eerst)**
- **author**: Theo
- **front**: yes
- **teaser-text**: “Tekst” **(Deze tekst komt bij de teaser op de blogs pagina te staan)**
- **front**: yes **(Bij een nieuwe blogs front op yes zetten als je deze op de voorpagina wilt)**

#Nieuwe pagina
- **title**:  "title"
- **subtitle**: "subtitle"
- **author**: Theo
- **menu**: **menu plaats | Als dit hetzelfde is als een andere pagina, dan wordt hij niet weergegeven.**

#Inhoud van **pagina** / **case** / **blog**

##Lijsten
`1. 2. 3. ect.` voor een numerieke lijst.
`- bla - bla` voor een lijst met puntjes ervoor.

##Links
``[Google](https://www.google.com "Google's Homepage")`` = [Google](https://www.google.com "Google's Homepage")

##Header
- **#** : staat voor h1
- **##** : staat voor h2
- **###** : staat voor h3
- **voorbeeld**: #dit is een h1

##Alinea
Om een aparte alinea te maken moet er een enter tussen de tekst zitten.

voorbeeld:

dit is een alinea dit is een alinea dit is een alinea dit is een alinea dit is een alinea
dit is een alinea dit is een alinea dit is een alinea dit is een alinea

dit is dan de volgende alinea dit is dan de volgende alinea dit is dan de volgende alinea
dit is dan de volgende alinea dit is dan de volgende alinea 

##Image
Om een afbeelding in een pagina te zetten moet er dit geplaatst worden:

{% image “/img/**afbeeldingsnaam.extensie**" “**style**" “**tekst onder afbeelding**" %}
	
Styles:
- **default** : standaard afbeelding
- **browser** : met browser frame
- **full** : volledige breedte

voorbeeld:
{% image "**/img/agile-board.png**" “**default**" "**Op het scrumbord zien we precies wat er 		nog moet gebeuren, wie waar mee bezig is en welke taken al zijn afgerond.**" %}

##Convince
Om een convine blok zoals http://beta.studiofonkel.nl/aanpak/index.html
Moet er het volgende geplaatst worden: {% convince **"naam van map in /convince"** %}
Je moet dus een mapje in **/convince** hebben, daarin zet je dan een **.md** bestand met als 	instelling: 

- **title**:  "title"
- **image:** /img/**afbeeldingsnaam.extensie**
- **number**: nummer die volgorde aangeeft

Om een nieuw convince blok aan te maken zet je dus een aantal bestanden in /convince.
Voorbeeld:
	/convine
		eerste.md
		tweede
		derde.md
		vierde.md

Instellingen:
- **title**:  "Eerste"
- **image**: /img/eerste.png
- **number**: 1

##Case Tags
{% case_tags %} om de categorieën te laten zien. 
Wel moet de Case categorieën hebben.
