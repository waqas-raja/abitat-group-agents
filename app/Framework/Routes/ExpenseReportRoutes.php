<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\ExpenseReport;
use PhpOffice\PhpSpreadsheet\Calculation\MathTrig\Exp;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpNotImplementedException;
use Slim\Routing\RouteCollectorProxy;

class ExpenseReportRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->get('/{id}', function (Request $request, Response $response) {
            return ExpenseReport::GetItem($request, $response);
        })->add($this->authMiddleware);

        $group->post('', function (Request $request, Response $response) {
            return ExpenseReport::Add($request, $response);
        })->add($this->authMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return ExpenseReport::Edit($request, $response);
        })->add($this->authMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return ExpenseReport::Delete($request, $response);
        })->add($this->authMiddleware);
        
        $group->get('/agents/{id}', function (Request $request, Response $response) {
            return ExpenseReport::GetAgentsByBranchId($request, $response);
        })->add($this->authMiddleware);
    }
}