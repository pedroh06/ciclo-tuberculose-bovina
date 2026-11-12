# Ciclo da tuberculose bovina 🐄

Animação educativa de 1 minuto, em HTML/CSS/JavaScript puros, mostrando o ciclo de transmissão da *Mycobacterium bovis*: a chegada ao rebanho, a infecção no bovino, a saída da bactéria e a chegada ao ser humano — e como interromper o ciclo.

## Como usar

Abra o `index.html` no navegador. Não precisa de servidor nem de dependências: a animação é feita com SVG e a Web Animations API, sem bibliotecas.

## Controles

- **Reproduzir / Pausar** — ou a tecla `Espaço`
- **Setas ← →** — voltar/avançar 5 segundos
- **Barra de progresso** — arrastar para qualquer ponto
- **Capítulos** — pular direto para uma das 6 cenas

## Publicar no GitHub Pages

1. Suba estes arquivos para um repositório.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. A página fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Estrutura

```
index.html      — estrutura da página e cenas em SVG
css/styles.css  — estilos, temas claro/escuro e player
js/script.js    — linha do tempo (60 s), animações, legendas e controles
```

## Aviso

Animação educativa. Não substitui orientação veterinária ou médica.
