<?php

use Slim\App;

$app->get('/wishlist', \Modules\wishlist\Main::class);