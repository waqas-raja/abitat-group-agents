<?php
require_once __DIR__ . '/vendor/autoload.php';

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Routes\ApiRoutes;
use App\Framework\Routes\AppRoutes;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$errorMiddleware->setDefaultErrorHandler(function (Request $request, Throwable $ex) use ($app) {
    $errMsg = $ex->getMessage();
    $statusCode = $ex->getCode();
    $response = $app->getResponseFactory()->createResponse();
    if($statusCode == 401) {
        error_log("The token is expired. The user will redirect to login page");
        return $response->withHeader("Location", "/")->withStatus(302);
    }
    $response->getBody()->write(json_encode(['error' => $errMsg]));
    return $response->withHeader('Content-Type', 'application/json')->withStatus($ex->getCode());
});
$app->add(new JWTMiddleware());
$appRoutes = new AppRoutes(new AuthMiddleware());
$appRoutes->register($app);
$apiRoutes = new ApiRoutes(new AuthMiddleware());
$apiRoutes->register($app);
$app->run();
