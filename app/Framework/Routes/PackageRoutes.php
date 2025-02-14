<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpNotImplementedException;
use Slim\Routing\RouteCollectorProxy;

class PackageRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            throw new HttpNotImplementedException($request, "add package entry point is not implemented");
        })->add($this->authMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            throw new HttpNotImplementedException($request, "get package entry point is not implemented");
        })->add($this->authMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            throw new HttpNotImplementedException($request, "edit package entry point is not implemented");
        })->add($this->authMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            throw new HttpNotImplementedException($request, "delete package entry point is not implemented");
        })->add($this->authMiddleware);
    }
}
