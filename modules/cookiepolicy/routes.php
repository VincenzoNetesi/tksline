<?php

use Slim\App;

$app->get('/cookie-policy', \Modules\cookiepolicy\Main::class);