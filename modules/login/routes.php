<?php

use Slim\App;

$app->get('/login', \Modules\login\Main::class);