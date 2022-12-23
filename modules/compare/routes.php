<?php

use Slim\App;

$app->get('/compare', \Modules\compare\Main::class);