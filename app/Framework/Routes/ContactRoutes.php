<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\Contact;
use App\Framework\Models\ContactActivity;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class ContactRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Contact::Add($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Contact::GetItem($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}/companies', function (Request $request, Response $response) {
            return Contact::GetLinkedCompanies($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}/calls', function (Request $request, Response $response) {
            return Contact::GetCalls($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}/requests', function (Request $request, Response $response) {
            return Contact::GetRequests($request, $response);
        })->add($this->authMiddleware);

        $group->post('/{id}/activity', function (Request $request, Response $response) {
            return ContactActivity::Add($request, $response);
        })->add($this->authMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Contact::Delete($request, $response);
        })->add($this->authMiddleware);

        $group->patch('/{id}/general-info', function (Request $request, Response $response) {
            return Contact::Update($request, $response);
        })->add($this->authMiddleware);
    }
}
