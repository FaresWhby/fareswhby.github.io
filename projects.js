(function () {
    'use strict';
    var projects = window.PORTFOLIO_PROJECTS || [];
    function element(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }
    function projectUrl(project) {
        return 'project.html?project=' + encodeURIComponent(project.slug);
    }
    var grid = document.getElementById('matrix');
    if (grid) {
        var columns = Math.min(3, Math.max(1, projects.length));
        var rows = Math.max(1, Math.ceil(projects.length / columns));
        var cards = [];
        function select(index) {
            var cols = Array(columns).fill('1fr');
            var tracks = Array(rows).fill('1fr');
            if (index >= 0) {
                cols[index % columns] = '7fr';
                tracks[Math.floor(index / columns)] = '7fr';
            }
            grid.style.gridTemplateColumns = cols.join(' ');
            grid.style.gridTemplateRows = tracks.join(' ');
            cards.forEach(function (card, i) {
                var active = i === index;
                card.node.classList.toggle('is-active', active);
                card.node.classList.toggle('is-dim', index >= 0 && !active);
                card.button.setAttribute('aria-expanded', String(active));
                card.link.hidden = !active;
            });
        }
        projects.forEach(function (project, i) {
            var card = element('div', 'cell');
            var media = element('div', 'cell-media');
            media.style.backgroundImage = 'url("' + project.cover + '")';
            var button = element('button', 'cell-toggle');
            button.type = 'button';
            button.setAttribute('aria-label', 'Expand project ' + project.title);
            button.setAttribute('aria-controls', 'project-detail-' + i);
            var detail = element('div', 'cell-detail', project.summary);
            detail.id = 'project-detail-' + i;
            var link = element('a', 'project-link', 'See project ↗');
            link.href = projectUrl(project);
            link.setAttribute('aria-label', 'See project: ' + project.title);
            card.append(media, element('div', 'cell-num', String(i + 1).padStart(2, '0')),
                element('div', 'cell-name', project.title), detail,
                element('div', 'cell-cat', project.category), button, link);
            button.addEventListener('click', function () {
                select(button.getAttribute('aria-expanded') === 'true' ? -1 : i);
            });
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    button.focus();
                    select(-1);
                }
            });
            cards.push({ node: card, button: button, link: link });
            grid.appendChild(card);
        });
        grid.style.height = Math.max(520, rows * 180) + 'px';
        select(-1);
    }

    var page = document.getElementById('project-content');
    if (!page) return;
    var slug = new URLSearchParams(window.location.search).get('project');
    var project = projects.find(function (item) { return item.slug === slug; });
    if (!project) {
        document.title = 'Project not found | Fares Whby';
        page.append(element('h1', '', 'Project not found'),
            element('p', '', 'Choose a project from the portfolio using the link above.'));
        return;
    }
    document.title = project.title + ' | Fares Whby';
    document.querySelector('meta[name="description"]').content = project.summary;
    page.append(element('p', 'mono-label', project.category), element('h1', '', project.title),
        element('p', 'project-intro', project.summary));
    function photo(src, alt, caption, lazy) {
        var figure = element('figure', 'project-photo');
        var img = element('img');
        img.src = src;
        img.alt = alt || '';
        img.decoding = 'async';
        if (lazy) img.loading = 'lazy';
        figure.appendChild(img);
        if (caption) figure.appendChild(element('figcaption', '', caption));
        return figure;
    }
    page.appendChild(photo(project.cover, project.coverAlt, '', false));
    var story = element('section', 'project-story');
    story.appendChild(element('h2', '', 'About the project'));
    (project.paragraphs || []).forEach(function (paragraph) {
        story.appendChild(element('p', '', paragraph));
    });
    page.appendChild(story);
    (project.gallery || []).forEach(function (image) {
        page.appendChild(photo(image.src, image.alt, image.caption, true));
    });
})();
