[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# minelev-notifications

Notifications for MinElev

## API

All API calls needs an Authorization header with valid jwt

### `POST /notification`

#### `warnings`

POST a generated warning from MinElev.
This service will notify contact teachers if one of their students has received a warning.

*See example data in [tests/data/warning.json](https://github.com/vtfk/minelev-notifications/blob/main/tests/data/warning.json)*

Returns

```JavaScript
{
  success: true,
  notifications: '<number-of-notifications>',
  logs: ['log-from-each-notification']
}
```

#### `yff`

POST a generated yff notification from MinElev-saksbehandler-robot.
This service will send emails to the persons specified in the "copy to" field.

*See example data in [tests/data/yff.json](https://github.com/vtfk/minelev-notifications/blob/main/tests/data/yff.json)*

Returns

```JavaScript
{
  success: true,
  log: ['log-from-notification']
}
```

## Development

Add a local `local.settings.json` file

```JSON
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "",
    "JWT_SECRET": "jwt-secret",
    "MINELEV_URL": "url-to-minelev",
    "PIFU_JWT_SECRET": "pifu-jwt-secret",
    "PIFU_URL": "pifu-service-url",
    "MAIL_SERVICE_URL": "mail-service-url",
    "MAIL_SERVICE_JWT": "mail-jwt-secret IF subscriptionkey used, remove this",
    "MAIL_TEMPLATE_NAME": "mail-service-template-name",
    "PAPERTRAIL_HOSTNAME": "minelev",
    "PAPERTRAIL_HOST": "logs.papertrails.com",
    "PAPERTRAIL_PORT": 12345
  }
}
```
