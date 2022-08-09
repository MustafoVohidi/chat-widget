# Инструкция по установке

## Простая установка

Перед закрывающим тегом `head` добавить код:

```
<link href=https://chat-widget.pfr-dev.cloud.rt.ru/js/app.js rel=preload as=script>
<link href=https://chat-widget.pfr-dev.cloud.rt.ru/js/chunk-vendors.js rel=preload as=script>
```

Перед закрывающим тегом `body` добавить:

```
<widget-chat></widget-chat>
<script src=https://chat-widget.pfr-dev.cloud.rt.ru/js/chunk-vendors.js></script>
<script src=https://chat-widget.pfr-dev.cloud.rt.ru/js/app.js></script>
```

## Параметры виджета

Все параметры в виджет передаются перед закрывающим тегом `body`

### Темы оформления

Передайте название темы в параметры виджета:

```
<widget-chat></widget-chat>
<script>
const chatWidget = document.querySelector('widget-chat')
chatWidget.options = {
  theme: 'blue'
}
</script>
<script src=/js/chunk-vendors.js></script>
<script src=/js/app.js></script>
```

Допустимые варианты тем:

- `default` (выбриается по умолчанию)
- `blue`

### Заголовок диалогового окна

Чтобы изменить текст в заголовке диалогового окна, передайте его в параметрах виджета:

```
<widget-chat></widget-chat>
<script>
const chatWidget = document.querySelector('widget-chat')
chatWidget.options = {
  theme: 'blue',
  header: {
    title: 'Задать вопрос',
    text: 'Чат-виджет единого контактного центра взаимодействия с гражданами'
  }
}
</script>
<script src=https://chat-widget.pfr-dev.cloud.rt.ru/js/chunk-vendors.js></script>
<script src=https://chat-widget.pfr-dev.cloud.rt.ru/js/app.js></script>
```
