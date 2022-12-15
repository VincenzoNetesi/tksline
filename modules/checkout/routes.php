<?php

use Slim\App;

$app->get('/checkout', \Modules\checkout\Main::class);