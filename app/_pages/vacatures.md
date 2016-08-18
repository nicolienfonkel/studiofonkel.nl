---
title: Vacatures
subtitle: "Kom je bij ons werken?"
metadescription: "Kom je bij ons werken?"
menu: 5
front: true
---

<div class="cases-overview">
	{% assign sorted_vacancies = site.vacancies | sort: 'date' %}

	{% for vacancy in sorted_vacancies reversed %}
		{% include teaser/vacancies.html %}
	{% endfor %}
</div>
