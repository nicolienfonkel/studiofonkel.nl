---
title: Vacatures
subtitle: "Kom je met ons meewerken aan mooie projecten?"
htmltitle: "Wij zoeken betrokken professionals"
metatile: "Wij zoeken betrokken professionals"
metadescription: "Kom je met ons meewerken aan mooie projecten?"
menu: 5
front: true
---
Studio Fonkel maakt een gestage groei door. Daarom willen we ons team uitbreiden met betrokken professionals. Momenteel hebben we de volgende vacatures:
<br/><br/>
<div class="cases-overview">
	{% assign sorted_vacancies = site.vacancies | sort: 'date' %}

	{% for vacancy in sorted_vacancies reversed %}
		{% include teaser/vacancies.html %}
	{% endfor %}
</div>
