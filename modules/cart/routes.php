<?php

use Slim\App;

$app->get('/carrello', \Modules\cart\Main::class);