# Chat Widget

- [Setup](#setup)
- [Usage](#usage)
- [Options](#options)
- [Chat rotes for develop](#chat-routes)
- [Custom title](#customizing)
- [Deploy](#deploy)

User manual is [here](/USER_MANUAL.md)

## <a name="setup"></a> Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## <a name="usage"></a> Project usage

Include code in HTML-page before closing head tag:

```
<link href=/js/app.js rel=preload as=script>
<link href=/js/chunk-vendors.js rel=preload as=script>
```

Include code in HTML-page before closing body tag:

```
<widget-chat></widget-chat>
<script>
const chatWidget = document.querySelector('widget-chat');
chatWidget.options = {
    // path to camunda chat ws service. Here is default value:
  ws: 'wss://camunda.pfr-dev.cloud.rt.ru/pfr1/route_request_text',
};
</script>
<script src=/js/chunk-vendors.js></script>
<script src=/js/app.js></script>
```

## <a name="options"></a> Options

| name         | type   | default                                                                       | description                   |
| ------------ | ------ | ----------------------------------------------------------------------------- | ----------------------------- |
| skillsRoute  | object | `null`                                                                        | Skills route parameter object |
| ws           | string | `null`                                                                        | Camunda websocket url         |
| header       | object | `header: { title: 'Центр консультирования ПФР', text: 'Задайте свой вопрос'}` | Header object                 |
| header.title | string | `'Центр консультирования ПФР'`                                                | Header block title            |
| header.text  | string | `'Задайте свой вопрос'`                                                       | Header block text             |

## <a name="chat-routes"></a> Chat routes (develop mode only)

You can define a skillsRoute parameter object. Where the object's key is a requested user name and the object's value is a target operator's chat skill.

```
chatWidget.options = {
    ws: 'wss://camunda.pfr-dev.cloud.rt.ru/pfr1/route_request_text',
    skillsRoute: {
        // requestedUserName: operatorChatSkill
        '8013': 'mitrichevChat',
        '8011': 'kashirinChat'
    }
};
```

## <a name="customizing"></a> Custom title (since v0.2.0)

To set a custom chat widget title, use `header` option:

```
chatWidget.options = {
  header: {
    title: 'Центр консультирования ПФР',
    text: 'Задайте свой вопрос'
  },
}

```

## <a name="deploy"></a> Deploy

Deploy via CI not ready yet. See [https://jira.satel.org/browse/PFR-424](https://jira.satel.org/browse/PFR-424). For deployment, build project and upload dists to remote. Setup options in HTML-file, where chat-widget was included.

### Develop platform (Kube)

- wss URL `wss://camunda.kube.satel.org/pfr1/route_request_text` in HTML file
- upload dists via ssh at `192.168.232.175` to folder `/var/www/check_callback_form_site/chat-widget`
- check new version at `http://192.168.232.175:18082/chat-widget.html`

### Production platform (RTK)

- wss URL `wss://camunda.pfr-dev.cloud.rt.ru/pfr1`
- upload dists via ssh at `rtu1.pfr-dev.cloud.rt.ru` to folder `/var/www/chat-widget`
- check new version at `https://satel.org/pfr`

### Experimental platforms

- wss URL `wss://192.168.232.121:8330/client`
- upload dists via ssh at `192.168.232.121` and `192.168.232.207` to folder `/var/www/pfr-chat-widget`
- check new version at `http://192.168.232.121:18082` and `http://192.168.232.207:18082`
