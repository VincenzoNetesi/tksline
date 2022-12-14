<?php

return [
    'settings.global' => [
        'sitename' => 'TKSLine',
        'encoding' => 'utf-8',
		'template' => 'tksline',
		'locale' => true,
		'maintenance' => false,
		'maintenancekey' => 'qa0fbbnzozm2',
        'language' => 'it',
		'languages' => ['it', 'en', 'fr']
    ],
    'settings.root' => realpath(__DIR__ .'/..'),
    'settings.temp' => realpath(__DIR__ .'/../tmp'),
	'settings.modules' =>  realpath(__DIR__ .'/../modules'),
    'settings.error' => [
        'display_error_details' => true,
		'log_errors' => true,
        'log_error_details' => true
    ],
	'settings.session' =>[
        'name' => 'client',
        'cache_expire' => 0,
	],
	'settings.upload' =>[
        'folder' => realpath(__DIR__ .'/../tmp'),
	],
	'settings.twig' => [
		// Template paths
		'paths' => [
			realpath(__DIR__ .'/../templates/tksline'),
		],
		'debug' => true,
		'path' => realpath(__DIR__ .'/../cache'),
		'url_base_path' => 'cache/',
		// Cache settings
		'cache_enabled' => false,
		'cache_path' => realpath(__DIR__ .'/../tmp'),
		'cache_name' => 'assets-cache',
		//  Should be set to 1 (enabled) in production
		'minify' => 0,
	],	
	'settings.logger' => [
		'name' => 'app',
		'path' => realpath(__DIR__ .'/../logs'),
		'filename' => 'app.log',
		'level' => \Monolog\Logger::DEBUG,
		'file_permission' => 0775,
	],
    'settings.secure' => [
        'crypt_salt' => '16fa91de3474749e928335c3560add628edf0ce5b8af631cf9201eb80e2a9a10'
    ],
    'settings.cookie' => [
		'admin' => 'ADM',
		'user' => 'USR',
        'cookie_exp' => '3600',
        'cookie_max_exp' => '7889238',
        'cookie_path' => '/dailywork/',
        'cookie_secure' => false,
        'cookie_http' => true
    ],
    'settings.db' => [
      'default' => [
            'driver' => 'mysql',
            'host' => '127.0.0.1',
            'database' => 'progetto_1',
            'username' => 'root',
            'password' => '123456',
            'prefix' => '',
            'charset' => 'utf8mb4',
            'port' => 3306

        ]
    ]
];