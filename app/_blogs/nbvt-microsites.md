---
title:  "Microsites met Jekyll en Drupal als content hub"
htmltitle:  "Microsites met Jekyll en Drupal als content hub"
metatitle: "Microsites met Jekyll en Drupal als content hub"
metadescription: "Klant kan zelf websites maken vanuit door ons gemaakte hoofdsite. Oftewel: Microsites met Jekyll en Drupal als content hub."
header-img: "/img/Blog-beeld.png"
og-image: "Opengraph-beeldentekst.png"
date:   2016-06-13 10:27:01
author: daniel
front: true
cta-text: "Nerd shizzle."
teaser-text: "Klant kan zelf websites maken vanuit door ons gemaakte hoofdsite. Oftewel: Microsites met Jekyll en Drupal als content hub."
---
Het afgelopen jaar stonden onze blogs in het teken van communicatie, identiteit en merkverhalen. Hoog tijd om de technische jongens van ons kantoor eens aan het woord te laten. Gaat het ontwikkelaarsjargon je de pet te boven? [Hier](/cases/nbvt/) vind je de beschrijving van de case in ‘normaal’ Nederlands.

Voor een van onze klanten hebben we een bijzonder systeem gebouwd. Hiermee kunnen ze zelf websites maken met de bestaande content van de door ons gemaakte Drupal 7 hoofdsite. Dit concept noemen we ‘microsites’. De manier waarop we dit hebben gebouwd is redelijk uniek en zijn we best trots op. Deze blog bestaat grofweg uit drie delen: [functionaliteiten](#functionaliteiten), [techniek](#techniek) en [nabeschouwing](#nabeschouwing).

Wil je vast een microsite bekijken? [Kozijnen van hout](http://kozijnenvanhout.nl/voordelen/) is een microsite.

## Functionaliteiten

De Nederlandse branchevereniging voor de Timmerindustrie [(NbvT)](https://nbvt.nl) kwam bij ons met de vraag om een kleine thema website. In het gesprek werd duidelijk dat er in de toekomst meer van dit soort kleine thema websites gebouwd moesten worden. Vanuit de techniek gedacht kwamen we met de suggestie om websites te genereren met Drupal. De NbvT zag ons idee wel zitten, dus begonnen we met uitdenken.

Iedere website zou bestaan uit optionele componenten. We voorzagen de volgende onderdelen: een nieuws sectie, downloads, een ledenzoeker, een inspiratie pagina en blogs. Verder nog wat kleine dingen zoals een twitterblokje en standaard pagina’s. Daarnaast leek het ons tof om de kleuren en de lettertypes instelbaar te maken.
Beheer

De microsites zijn eenvoudig te beheren. Per artikel of nieuwsitem kun je aangeven op welke websites het gepubliceerd moet worden. Ook kun je op de microsite node van alles instellen met betrekking tot de weergave en functionaliteit. Denk aan een twitter-gebruikersnaam tot lettertypes en kleuren. Ook is het mogelijk om Google Analytics te koppelen of Disqus (een comment systeem).

## Techniek

Onze bedrijfswebsite is gebouwd met Jekyll en dat bevalt ons zeer goed. Het geeft een eenvoudig beheerbare website. Door het gebruik van markdown bestanden voor content en het gebruik van git, hebben we alles in code. Het is een simpel systeem, daardoor hebben we een lage instap voor developers. Dit leken ons goede eigenschappen voor de microsites. Daarom hebben we gekozen om Drupal als API te laten fungeren die dan builds van Jekyll sites uitvoert.

[Jekyll](http://jekyllrb.com/) is een statische site generator. Dat houdt in dat er geen cms is en dat er ook geen processorkracht nodig is om een bezoeker een pagina te serveren. Dit houdt natuurlijk in dat de processorkracht verschoven is. Er moet immers een moment zijn dat de pagina gerendered wordt. Dit moment is verschoven naar de build.

In de build worden de sass bestanden gebouwd, de javascript bestanden gecomprimeerd en de html gegenereerd aan de hand van templates, markdown en JSON bestanden. Dit proces duurt ongeveer een minuut en kan oplopen naarmate de website groter wordt.

Het idee in grote lijnen is eenvoudig; content beheer in Drupal, bij het aanmaken of aanpassen van content een nieuwe build triggeren van de Jekyll sites op een build server, waarbij de build server statische HTML genereert en de microsites host.
Vanuit dit hoofdidee vloeien een aantal hoofdcomponenten: [Het beheer in Drupal](#het-beheer-in-drupal), De API laag, De build server, en de automatisch aangemaakte git repo’s waarin ieder project is opgeslagen.

### Het beheer in Drupal

Een aantal dingen waren belangrijk: menubeheer, SEO waarde behouden door middel van het zetten van de canonical en flexibiliteit.
Om te beginnen hebben we een content type ‘microsite’ aangemaakt met een hele reeks velden. Ieder component kan een veld bevatten. Die hebben we met fieldgroup netjes in tabjes gezet.
Voor het kiezen van lettertypes gebruiken we de google fonts API die we gekoppeld hebben naar een veld via het aanpassen van de allowed_values_function callback in de base definitie van het veld. Zie dit artikel voor meer info: https://www.phase2technology.com/blog/setting-the-allowed-values-function-property-on-text-fields/.
We hebben hook_html_head_alter gebruikt om de canonical aan de hand van de geselecteerde site (waaronder de hoofdsite) te zetten.

### De API laag

Voor de API laag hebben we een [module](https://www.drupal.org/sandbox/danielbeeke/2713857) geschreven. Deze module is instelbaar via een view mode (JSE) in de fields ui (manage display). Je kunt dus er dus simpelweg een aantal velden inslepen en die zullen dan via het label gerenderd worden in de JSON output van de API. Het selecteren van de data gebeurt via een hook en een function callback. Het resultaat is een endpoint met een of meerdere verschillende entiteiten, netjes gerendered als JSON.

### De build server

We hebben een build server geschreven specifiek voor grunt en Jekyll. Zie https://github.com/studio-fonkel/jekyll-build. Deze server bouwt aan de hand van de content de website. Hij checkt bijvoorbeeld of er een gruntfile is, of er een CNAME bestand is en of er al een dist mapje bestaat. Met deze checks worden de juiste taken uitgevoerd. Door middel van een git hook op github triggeren we de build server.
De automatisch aangemaakte git repo’s

## Nabeschouwing
