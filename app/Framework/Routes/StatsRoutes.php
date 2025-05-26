<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\Stats;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class StatsRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->get('/top-agents', function (Request $request, Response $response) {
            return Stats::GetTop10Agents($request, $response);
        })->add($this->authMiddleware);

        $group->get('/histogram', function (Request $request, Response $response) {
            return Stats::GetHistogram($request, $response);
        })->add($this->authMiddleware);

        $group->get('/pie', function (Request $request, Response $response) {
            return Stats::GetPie($request, $response);
        })->add($this->authMiddleware);
    }
}
