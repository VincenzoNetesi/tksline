<?php

use Slim\App;

$app->get('/terms-and-conditions', \Modules\termini\Main::class);