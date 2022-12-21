<?php

use Slim\App;

$app->get('/contatti', \Modules\contact\Main::class);