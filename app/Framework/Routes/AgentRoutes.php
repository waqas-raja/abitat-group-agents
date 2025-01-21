<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\Agent;
use App\Framework\Models\AgentActivity;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class AgentRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Agent::Add($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Agent::GetItem($request, $response);
        })->add($this->authMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Agent::Delete($request, $response);
        })->add($this->authMiddleware);

        $group->patch('/{id}/general-info', function (Request $request, Response $response) {
            return Agent::Update($request, $response);
        })->add($this->authMiddleware);
    }
}
