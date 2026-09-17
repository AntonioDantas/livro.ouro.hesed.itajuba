// === Geração Dinâmica e Síncrona (Pós-Fetch) das Páginas ===
    (function() {
        
        fetch('App_Data/People.json')
            .then(function(response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function(people) {
                processAndLoadBook(people);
            })
            .catch(function(err) {
                console.error('Erro ao carregar People.json. Se você estiver abrindo o arquivo direto no Chrome (file://), pode ser um bloqueio de segurança CORS.', err);
                alert("Erro ao ler App_Data/People.json automaticamente (bloqueio de segurança do navegador local). O livro carregará apenas as páginas fixas.");
                // Se der erro, tenta carregar o livro mesmo assim com as 7 páginas iniciais
                loadFlipbookScript();
            });

        function processAndLoadBook(people) {
            people.sort(function(a, b) { return a.Number - b.Number; });
            var itensPorPagina = 15;
            var newListPeople = [];
            for (var pi = 0; pi < people.length; pi++) {
                var p = people[pi];
                var names = p.Name.split('\n');
                for (var ni = 0; ni < names.length; ni++) {
                    newListPeople.push({ Id: p.Id, Number: p.Number, Name: names[ni].replace(/\r/g, '') });
                }
            }
            
            window.qtdFaltante = 800 - people.length;
            var spanFaltante = document.getElementById('qtdFaltante');
            if (spanFaltante) spanFaltante.textContent = window.qtdFaltante;

            var numeroDePaginas = Math.ceil(newListPeople.length / itensPorPagina);
            
            var generatedDeeplinks = '';
            var generatedPages = '';
            
            for (var i = 0; i < numeroDePaginas; i++) {
                var pageItems = newListPeople.slice(i * itensPorPagina, (i + 1) * itensPorPagina);
                var lines = [];
                for (var k = 0; k < pageItems.length; k++) {
                    var x = pageItems[k];
                    var itemText = x.Name;
                    
                    var first = null;
                    for (var j = 0; j < newListPeople.length; j++) {
                        if (newListPeople[j].Number === x.Number) {
                            first = newListPeople[j];
                            break;
                        }
                    }
                    
                    var hasSiblings = false;
                    for (var j = 0; j < newListPeople.length; j++) {
                        if (newListPeople[j].Number === x.Number && newListPeople[j] !== x) {
                            hasSiblings = true;
                            break;
                        }
                    }
                    
                    if (hasSiblings && first.Name !== x.Name) {
                        var spaces = '';
                        var numLen = x.Number.toString().length + 5;
                        for (var s = 0; s < numLen; s++) {
                            spaces += '&nbsp;';
                        }
                        lines.push(spaces + itemText);
                    } else {
                        lines.push(x.Number + ' - ' + itemText);
                    }
                }
                
                var pageNum = i + 8;
                var nomesHtml = lines.join('<br>').trim();
                
                generatedPages += 
                    '<!-- begin page ' + pageNum + ' -->' +
                    '<div data-background-image="img/nomes.jpg">' +
                        '<div class="nomes">' + nomesHtml + '<\/div>' +
                        '<div class="fb5-cont-page-book">' +
                            '<div class="fb5-gradient-page"><\/div>' +
                            '<canvas id="canv' + pageNum + '"><\/canvas>' +
                            '<div class="fb5-page-book"><\/div>' +
                        '<\/div>' +
                    '<\/div>' +
                    '<!-- end page ' + pageNum + ' -->\n';
                
                generatedDeeplinks += '<li data-address="page' + pageNum + '" data-page="' + pageNum + '"><\/li>\n';
            }
            
            // Injeta as páginas dinâmicas e deeplinks diretamente no DOM (para que estejam prontos quando o onload.js iniciar)
            // Usa window.onload para garantir que as divs do body existam, ou document.addEventListener
            var injectInterval = setInterval(function() {
                var bookDiv = document.getElementById('fb5-book');
                var deeplinkUl = document.getElementById('fb5-deeplinking-ul');
                if (bookDiv && deeplinkUl) {
                    clearInterval(injectInterval);
                    deeplinkUl.insertAdjacentHTML('beforeend', generatedDeeplinks);
                    bookDiv.insertAdjacentHTML('beforeend', generatedPages);
                    loadFlipbookScript();
                }
            }, 10);
        }

        function loadFlipbookScript() {
            var script = document.createElement('script');
            script.src = 'Scripts/onload.js';
            document.head.appendChild(script);
        }
    })();
