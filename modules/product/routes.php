<?php

use Slim\App;

$app->get('/product[/]', \Modules\product\Main::class);