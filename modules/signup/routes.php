<?php

use Slim\App;

$app->get('/signup', \Modules\signup\Main::class);