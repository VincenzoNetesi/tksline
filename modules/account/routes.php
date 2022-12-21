<?php

use Slim\App;

$app->get('/account', \Modules\account\Main::class);