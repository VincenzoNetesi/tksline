<?php

use Slim\App;

$app->get('/chi-siamo', \Modules\whoweare\Main::class);