---
layout: page
title: Mysql
permalink: /mysql/
sort: 08
---

<div class="home">
    <h1 class="post-title">{{page.title}}（{{site.categories.mysql.size}}）</h1>
    <ul class="post-list">
        {% for post in site.categories.mysql %}
            <li>
            <span class="post-meta">{{ post.date | date: "%Y年%m月%d日" }}</span>

            <h2>
              <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
            </h2>
            <p>{{ post.excerpt }}</p>
            </li>
        {% endfor %}
    </ul>
</div>