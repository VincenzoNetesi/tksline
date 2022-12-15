<?php

use Slim\App;

$app->get('/store?s={param1}', \Modules\store\Main::class);
$app->get('/store[/]', \Modules\store\Main::class);
