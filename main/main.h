#ifndef __MAIN_H__
#define __MAIN_H__

#include "esp_err.h"
#include "esp_event.h"
#include "esp_http_server.h"

ESP_EVENT_DECLARE_BASE(LED_EVENT);
enum  {
    LED_OFF,
    LED_UPDATE,
};

#endif