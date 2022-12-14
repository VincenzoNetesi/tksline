<?php

namespace Modules\product;

use Slim\App;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Views\Twig;
use PerSeo\Translator;

final class Main
{
	protected $app;
	protected $container;
    protected $twig;

    public function __construct(App $app, ContainerInterface $container, Twig $twig)
    {
		$this->app = $app;
		$this->container = $container;
        $this->twig = $twig;
		$this->global = $container->get('settings.global');

    }

    public function __invoke(Request $request, Response $response): Response {
		$curtemplate = $this->global['template'] ;
		$module = $this->container->get('settings.modules') .'/product';
		$language = (!empty($request->getAttribute('locale')) ? $request->getAttribute('locale') : $request->getAttribute('language'));
		$lang = new Translator($language, $module);
		$langs = $lang->get();
        $viewData = [
			'basepath' => (string) $this->app->getBasePath(),
			'language' => (!empty($request->getAttribute('locale')) ? $request->getAttribute('locale') : $request->getAttribute('language')),
			'lang' => $langs['body']
        ];
		//$response->getBody()->write($request->getAttribute('language'));
		//return $response;
		//echo $request->getAttribute('language');

        return $this->twig->render($response,  'product.twig' , $viewData);
    }
}